import outdent from "../../npm/esm/deps/deno.land/x/outdent@v0.8.0/mod.js";
import { axios, AxiosRequestConfig } from "../deps.ts";
import { AxiosInstance, AxiosResponse, R, z } from "./deps.ts";
import { v5 as uuid } from "https://deno.land/std@0.202.0/uuid/mod.ts";
import { crypto } from "https://deno.land/std@0.204.0/crypto/mod.ts";
import { encodeBase64 } from "https://deno.land/std@0.204.0/encoding/base64.ts";

const MethodValidator = z.enum(["post", "get", "delete", "options", "put"]);

const RequestValidator = z.object({
  url: z.string(),
  data: z.unknown(),
  headers: z.record(z.string()),
  method: MethodValidator,
});

const ResponseValidator = z.object({
  data: z.unknown(),
  headers: z.record(z.string()),
  status: z.number(),
});

const CacheItemValidator = z.object({
  request: RequestValidator,
  response: ResponseValidator,
});

const CacheContextValidator = z.object({
  /* maps request hash to a cache item */
  entries: z.record(CacheItemValidator),
});

const CacheValidator = z.record(CacheContextValidator);

const RunningContextValidator = z.object({
  expectedRequestHashes: z.string().array(),
  contextName: z.string(),
  ignoreOrder: z.boolean(),
  requestsMadeCount: z.number(),
});

type ContextId = string;

interface AssertSameNetworkRequestsOptions {
  ctx: Deno.TestContext;
  name?: string;
  ignoreOrder?: boolean;
  expectedRequestHashes?: string[];
}

let axiosSnapshotNextFreeId = 1;

interface CreateArgs {
  axios: AxiosInstance;
  fileName?: string;
}

export const create = async (createArgs: CreateArgs) => {
  const real = await createForTesting(createArgs);
  const keys: (keyof typeof real)[] = [
    "flushAndClose",
  ];
  return Object.freeze(R.pick(keys, real));
};

export const createForTesting = async (createArgs: CreateArgs) => {
  interface State {
    cache: z.infer<typeof CacheValidator>;

    /* used for extra error checking */
    contextIdToCallstack: Record<string, string>;

    /* maps stack ID to a context which has the real context */
    runningContexts: Record<string, z.infer<typeof RunningContextValidator>>;
    nextFreeStacktraceId: number;
  }

  const initState = async (): Promise<State> => {
    const rawData = JSON.parse(await Deno.readTextFile(fileName));
    const cache = CacheValidator.parse(rawData);

    return deepFreeze({
      cache,
      contextIdToCallstack: {},
      runningContexts: {},
      nextFreeStacktraceId: 0,
    });
  };

  const { axios } = createArgs;
  const fileName = createArgs.fileName ?? "./network_snapshot.json";
  const instanceId = axiosSnapshotNextFreeId++;

  /** necessary because code after an `await` might now have a different state, this helps reduce odds someone adds an await somewhere that breaks the transaction */
  const { getState, stateTransaction } = await (async () => {
    let _state: Readonly<State> = await initState();

    interface StateTransactionCallbackArgs {
      txState: () => Readonly<State>;
      setState: (s: State | ((ss: State) => State)) => void;
    }

    const stateTransaction = <A>(
      f: (args: StateTransactionCallbackArgs) => Exclude<A, Promise<any>>,
    ): A => {
      const initialState = _state;
      let newState = initialState;
      const result = f({
        txState: () => newState,
        setState: (x) => {
          if (typeof x === "function") {
            newState = deepFreeze(x(newState));
            return;
          }
          newState = deepFreeze(x);
        },
      });
      if (_state !== initialState) {
        throw new Error(`unexpected error: state changed during transaction`);
      }
      _state = newState;
      return result;
    };

    const getState = () => _state;

    return { getState, stateTransaction };
  })();

  const uniqueCallstackPrefix = `AS$I${instanceId}$`;

  const flushAndClose = async () => {
    await Deno.writeTextFile(fileName, JSON.stringify(CacheValidator.parse(getState().cache), null, 4));
  };

  const assertSameNetworkRequests = async <Result>(
    { ctx, ignoreOrder, expectedRequestHashes, name }: AssertSameNetworkRequestsOptions,
    fn: () => Promise<Result>,
  ): Promise<Result> => {
    const contextName = generateContextName(ctx, name);
    const errorPrefix = `assertSameNetworkRequests(${contextName}):`;

    const { callstackUniqueTag } = stateTransaction(({ txState, setState }) => {
      const callstack = new Error().stack;

      if (callstack === undefined) {
        throw new Error(
          `${errorPrefix} callstack undefined. Error.callstack needed to generate unique IDs and detect duplicate calls to withContext.`,
        );
      }

      if (callstack.includes(uniqueCallstackPrefix)) {
        throw new Error(`${errorPrefix} cant have nested contexts`);
      }

      if (contextName in txState().contextIdToCallstack && txState().contextIdToCallstack[contextName] !== callstack) {
        throw new Error(
          `${errorPrefix} called with same name from multiple locations.\n. This is bad because the text needs to be unique.`,
        );
      }

      const stacktraceId = txState().nextFreeStacktraceId;

      const callstackUniqueTag = `${uniqueCallstackPrefix}C${stacktraceId}`;

      if (txState().runningContexts[callstackUniqueTag] !== undefined) {
        throw new Error(
          `${errorPrefix} callstackUniqueTag(${callstackUniqueTag}) already exists. This should never happen.`,
        );
      }

      setState((s) => ({
        ...s,
        nextFreeStacktraceId: s.nextFreeStacktraceId + 1,
        contextIdToCallstack: {
          ...s.contextIdToCallstack,
          [contextName]: callstack,
        },
        runningContexts: {
          ...s.runningContexts,
          [callstackUniqueTag]: {
            contextName,
            expectedRequestHashes: expectedRequestHashes ?? [],
            ignoreOrder: ignoreOrder ?? false,
            requestsMadeCount: 0,
          },
        },
      }));

      return { callstackUniqueTag };
    });

    const wrappedAsyncFn: (f: typeof fn) => Promise<Result> = Function(`
    return async function ${callstackUniqueTag}() {
      const result = await arguments[0]()
      return result
    }
  `)();

    try {
      return await wrappedAsyncFn(fn);
    } finally {
      stateTransaction(({ setState }) => {
        setState((s) => ({
          ...s,
          runningContexts: R.omit([callstackUniqueTag], s.runningContexts),
        }));
      });
    }
  };

  const getRunningStackId = (): string => {
    function escapeRegExp(string: string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
    }

    const groupId = "ContextId";
    const regex = new RegExp(`(?<${groupId}>` + escapeRegExp(uniqueCallstackPrefix) + "C\\d+)");

    const stack = new Error().stack;

    if (!stack) {
      throw new Error(`unable to get contextId because no stack is available on the error object`);
    }

    {
      const matches = stack.match(new RegExp(regex, "g"));
      if (matches !== null && matches.length > 1) {
        throw new Error(
          `multiple contexts detected. This is bad because getCurrentContextId() should only be called when there is a single context.`,
        );
      }
    }

    const contextId = stack.match(regex)?.groups?.[groupId] ?? null;
    if (!contextId) {
      throw new Error("unable to detect any context");
    }
    return contextId;
  };

  // TODO detect error where expected request hashes dont come up

  const createHandler = (method: z.infer<typeof MethodValidator>) => {
    return async (...args: unknown[]) => {
      const { url, data, config: { headers }, realArgs } = parseMethodArgs({ method, args });

      const internalRequest = RequestValidator.parse(
        { url, data, method, headers } satisfies z.infer<typeof RequestValidator>,
      );

      const requestHash = generateRequestHash(internalRequest);

      const runningStackId = getRunningStackId();

      const { cacheItem } = stateTransaction(({ txState, setState }) => {
        const runningContext = txState().runningContexts[runningStackId];
        if (!runningContext) {
          throw new Error(`unexpected error: runningContext not found for stackId: ${runningStackId}`);
        }
        const getCacheContext = () => {
          let cacheContext = txState().cache[runningContext.contextName];
          if (cacheContext) {
            return cacheContext;
          }
          setState((s) => ({
            ...s,
            cache: {
              ...s.cache,
              [runningContext.contextName]: {
                entries: {},
              },
            },
          }));
          cacheContext = txState().cache[runningContext.contextName];
          if (cacheContext) {
            return cacheContext;
          }
          throw new Error(`unexpected error: cacheContext not found for contextName: ${runningContext.contextName}`);
        };

        const cacheContext = getCacheContext();

        const indexIntoKnownHashes = runningContext.expectedRequestHashes.indexOf(requestHash);

        if (indexIntoKnownHashes === -1) {
          const existingCacheEntries = Object.values(cacheContext.entries).map(({ request: x }) =>
            `* ${x.method} ${x.url} ${x.headers} ${JSON.stringify(x.data)}`
          ).join("\n");

          throw new Error(outdent`
            unexpected request in context '${runningContext.contextName}'.
            Request: '${method} ${url} ${headers} ${JSON.stringify(data)}.
            To Fix: add the following to the expectedRequestHashes array: '${requestHash}'.

            Existing Cache Entries:
            ${existingCacheEntries}}
          `);
        }

        const isRequestOutOfOrder = indexIntoKnownHashes !== -1 &&
          !runningContext.ignoreOrder &&
          indexIntoKnownHashes !== runningContext.requestsMadeCount;
        if (isRequestOutOfOrder) {
          const existingCacheEntries = Object.values(cacheContext.entries).map(({ request: x }) =>
            `* ${x.method} ${x.url} ${x.headers} ${JSON.stringify(x.data)}`
          ).join("\n");

          throw new Error(outdent`
            request out of order in context '${runningContext.contextName}'.
            Request: '${method} ${url} ${headers} ${JSON.stringify(data)}.
            expected position ${runningContext.requestsMadeCount} but was ${indexIntoKnownHashes}.
            To Fix: move request hash '${requestHash}' into index ${runningContext.requestsMadeCount}.

            Existing Cache Entries:
            ${existingCacheEntries}}
          `);
        }

        setState((s) => ({
          ...s,
          runningContexts: {
            ...s.runningContexts,
            [runningStackId]: {
              ...s.runningContexts[runningStackId],
              requestsMadeCount: s.runningContexts[runningStackId].requestsMadeCount + 1,
            },
          },
        }));

        return {
          cacheItem: cacheContext.entries[requestHash] as z.infer<typeof CacheItemValidator> | undefined,
        };
      });

      if (cacheItem) {
        return ResponseValidator.parse(cacheItem.response);
      }

      const realResponse = await axios[method].apply(axios, [...realArgs] as any) as AxiosResponse;

      const response = ResponseValidator.parse(
        {
          data: realResponse.data,
          headers: realResponse.headers,
          status: realResponse.status,
        } satisfies z.infer<typeof ResponseValidator>,
      );

      const response = await (async () => {
        if (updateMode) {
        } else {
          const cachedResponse = getFromCacheByRequest(contextEntries, internalRequest)?.response;
        }
      })();

      const cacheItemFromRequest = getFromCacheByRequest(contextEntries, internalRequest);

      if (cacheItemFromContext) {
        if (!cacheItemFromRequest) {
          throw new Error(
            `axios cache miss for request '${method} ${url} ${
              JSON.stringify(data)
            }' BUT found a matching hit with the context '${context}': ${method} ${url} ${JSON.stringify(data)}`,
          );
        }
        return Promise.resolve(cacheItemFromContext.response);
      }

      if (cacheItemFromRequest) {
        if (context !== null) {
          return Promise.resolve(cacheItemFromRequest.response);
        }

        throw new Error(
          `axios cache miss for context '${context}' BUT found a matching hit without the context: ${method} ${url} ${
            JSON.stringify(data)
          }`,
        );
      }

      throw new Error(`axios cache miss: ${method} ${url} ${JSON.stringify(data)}`);
    };
  };

  const axiosProxy = Object.freeze({
    defaults: axios.defaults,
    post: createHandler("post"),
    put: createHandler("put"),
    get: createHandler("get"),
    delete: createHandler("delete"),
    options: createHandler("options"),
  });

  return Object.freeze({
    axios: axiosProxy,
    flushAndClose,
    assertSameNetworkRequests,
  });
};

// export const create = (realAxios: AxiosInstance): CreateReturn => {
//   const cache: z.infer<typeof CacheValidator> = {};
//   const contextLookup: Record<ContextId, ContextText> = {};

//   const axios = ({
//     defaults: realAxios.defaults,
//     post: handleCreator({ method: "post", realAxios, cache }),
//     put: handleCreator({ method: "put", realAxios, cache }),
//     get: handleCreator({ method: "get", realAxios, cache }),
//     delete: handleCreator({ method: "delete", realAxios, cache }),
//     options: handleCreator({ method: "options", realAxios, cache }),
//   }) as any;

//   return {
//     axios,
//     assertSameNetworkRequests: assertSameNetworkRequestsInternal,
//   };
// };

//       return async (url: string, ...args: any[]) => {
//         const result = await target[methodResult.data].apply(target, [url, ...args] as any) as AxiosResponse;
//         let data: unknown;
//         switch (methodResult.data) {
//           case "post":
//           case "put":
//             data = args[0];
//             break;
//           default:
//             data = null;
//         }
//         const context = getCurrentContextText();

//         const existingCacheEntry = getFromCacheByRequest({ url, data, method: methodResult.data });

//         if (existingCacheEntry?.request.context !== undefined) {
//           if (existingCacheEntry.request.context !== context) {
//             throw new Error(
//               `axios cache miss for context '${context}' BUT found a matching hit with the context '${existingCacheEntry.request.context}': ${methodResult.data} ${url} ${
//                 JSON.stringify(data)
//               }`,
//             );
//           }
//         } else {
//         }

//         if (shouldAddToCache) {
//           cache.push(CacheItemValidator.parse({
//             request: { method: methodResult.data, url, data, context: context ?? undefined },
//             response: result,
//           } as z.infer<typeof CacheItemValidator>));
//         }

//         return result;
//       };
//     },
//   });
// };

const readonlyHandleCreator = ({ method }: { method: z.infer<typeof MethodValidator> }) => (...args: unknown[]) => {
  const { url, data, config: { headers }, realArgs } = parseMethodArgs({ method, args });

  const context = getCurrentContextText();
  const contextEntries = cache[context];

  const internalRequest = RequestValidator.parse(
    { url, data, method, headers } satisfies z.infer<typeof RequestValidator>,
  );

  const cachedResponse = getFromCacheByRequest(contextEntries, internalRequest)?.response;

  if (!cachedResponse) {
    const errorMsg = outdent`
        axios cache miss in context '${context}'.
        Request: '${method} ${url} ${headers} ${JSON.stringify(data)}.
        Possible Cache Enries:
        ${
      contextEntries.map(({ request: x }) => `* ${x.method} ${x.url} ${x.headers} ${JSON.stringify(x.data)}`).join("\n")
    }
      `;
    throw new Error(errorMsg);
  }

  const response = ResponseValidator.parse(
    {
      data: cachedResponse.data,
      headers: cachedResponse.headers,
      status: cachedResponse.status,
    } satisfies z.infer<typeof ResponseValidator>,
  );

  const cacheItemFromRequest = getFromCacheByRequest(contextEntries, internalRequest);

  if (cacheItemFromContext) {
    if (!cacheItemFromRequest) {
      throw new Error(
        `axios cache miss for request '${method} ${url} ${
          JSON.stringify(data)
        }' BUT found a matching hit with the context '${context}': ${method} ${url} ${JSON.stringify(data)}`,
      );
    }
    return Promise.resolve(cacheItemFromContext.response);
  }

  if (cacheItemFromRequest) {
    if (context !== null) {
      return Promise.resolve(cacheItemFromRequest.response);
    }

    throw new Error(
      `axios cache miss for context '${context}' BUT found a matching hit without the context: ${method} ${url} ${
        JSON.stringify(data)
      }`,
    );
  }

  throw new Error(`axios cache miss: ${method} ${url} ${JSON.stringify(data)}`);
};

const parseMethodArgs = ({ method, args }: { method: z.infer<typeof MethodValidator>; args: unknown[] }) => {
  const parseConfig = (config: AxiosRequestConfig | undefined) => {
    if (!config) {
      return { headers: {} };
    }
    const configParseResult = axiosConfigValidator.safeParse(config);
    if (!configParseResult.success) {
      throw new Error(`only headers supported in axios_snapshot config block`);
    }
    return {
      headers: {},
      ...configParseResult.data,
    };
  };

  if (method === "get" || method === "delete" || method === "options") {
    const [url, config] = args as Parameters<AxiosInstance["get" | "delete" | "options"]>;
    return { url, config: parseConfig(config), data: undefined, realArgs: [url, config] };
  } else if (method === "post" || method === "put") {
    const [url, data, config] = args as Parameters<AxiosInstance["post" | "put"]>;
    return { url, data, config: parseConfig(config), realArgs: [url, data, config] };
  } else {
    ((x: never) => {})(method);
    throw new Error(`unknown method: ${method}`);
  }
};

const axiosConfigValidator = z.object({
  headers: z.record(z.string()).optional(),
}).strict();

const handler = <Method extends z.infer<typeof MethodValidator>, Args extends Parameters<AxiosInstance[Method]>>(
  { method, updateMode, realAxios }: HandlerProps<Method>,
): AxiosInstance[Method] =>
(...args: Args): ReturnType<AxiosInstance[Method]> => {
  const { url, data, config, realArgs } = (() => {
    if (method === "get" || method === "delete" || method === "options") {
      const [url, config] = args as Parameters<AxiosInstance["get" | "delete" | "options"]>;
      return { url, config: config ?? {}, data: undefined, realArgs: [url, config] };
    } else if (method === "post" || method === "put") {
      const [url, data, config] = args as Parameters<AxiosInstance["post" | "put"]>;
      return { url, data, config: config ?? {}, realArgs: [url, data, config] };
    } else {
      ((x: never) => {})(method);
      throw new Error(`unknown method: ${method}`);
    }
  })();

  const configParseResult = axiosConfigValidator.safeParse(config);

  if (!configParseResult.success) {
    throw new Error(`only headers supported in axios_snapshot config block`);
  }

  const headers = configParseResult.data.headers ?? {};

  const context = getCurrentContextText();
  const contextEntries = cache[context];

  const internalRequest = RequestValidator.parse(
    { url, data, method, headers } satisfies z.infer<typeof RequestValidator>,
  );

  const response = await (async () => {
    if (updateMode) {
      const realResponse = await realAxios[method].apply(realAxios, [...realArgs] as any) as AxiosResponse;
      const internalResponse = ResponseValidator.parse(
        {
          data: realResponse.data,
          headers: realResponse.headers,
          status: realResponse.status,
        } satisfies z.infer<typeof ResponseValidator>,
      );
    } else {
      const cachedResponse = getFromCacheByRequest(contextEntries, internalRequest)?.response;
    }
  })();

  const cacheItemFromRequest = getFromCacheByRequest(contextEntries, internalRequest);

  if (cacheItemFromContext) {
    if (!cacheItemFromRequest) {
      throw new Error(
        `axios cache miss for request '${method} ${url} ${
          JSON.stringify(data)
        }' BUT found a matching hit with the context '${context}': ${method} ${url} ${JSON.stringify(data)}`,
      );
    }
    return Promise.resolve(cacheItemFromContext.response);
  }

  if (cacheItemFromRequest) {
    if (context !== null) {
      return Promise.resolve(cacheItemFromRequest.response);
    }

    throw new Error(
      `axios cache miss for context '${context}' BUT found a matching hit without the context: ${method} ${url} ${
        JSON.stringify(data)
      }`,
    );
  }

  throw new Error(`axios cache miss: ${method} ${url} ${JSON.stringify(data)}`);
};

const getFromCacheByRequest = (
  items: z.infer<typeof CacheValidator>[string],
  matcher: z.infer<typeof RequestValidator>,
) => {
  const matcherWithoutUndefinedKeys = JSON.parse(JSON.stringify(matcher));
  return items.find((item) => R.equals(item.request, matcherWithoutUndefinedKeys)) ?? null;
};

const generateContextName = (ctx: Deno.TestContext, name?: string): string => {
  const prefix = ctx.parent ? `'${generateContextName(ctx.parent)}' -> ` : "";
  const postfix = name ? ` -> '${name}'` : "";
  return prefix + ctx.name + postfix;
};

// export const createUniqueContextId = async (axiosSnapshotInstanceId: number, contextName: string) => {
//   const namespace = "ad457a69-b407-403a-8189-eb998a79dd99";
//   const data = new TextEncoder().encode(`${axiosSnapshotInstanceId}:${contextName}`);
//   const idInUuidFormat = await uuid.generate(namespace, data);
//   return idInUuidFormat.replace(/-/g, "");
// };

const generateRequestHash = (request: z.infer<typeof RequestValidator>) => {
  const requestWithoutInvisibleFields = RequestValidator.parse(request);
  return encodeBase64(
    crypto.subtle.digestSync("SHA-1", new TextEncoder().encode(JSON.stringify(requestWithoutInvisibleFields))),
  );
};

const deepFreeze = <T extends object>(obj: T) => {
  R.keys(obj).forEach((prop) => {
    const val = obj[prop];
    if (
      typeof val === "object" &&
      !Object.isFrozen(val)
    ) {
      deepFreeze(val as object);
    }
  });
  return Object.freeze(obj);
};
