import outdent from "../../npm/esm/deps/deno.land/x/outdent@v0.8.0/mod.js";
import { axios, AxiosRequestConfig } from "../deps.ts";
import { AxiosInstance, AxiosResponse, R, z } from "./deps.ts";
import { crypto } from "https://deno.land/std@0.204.0/crypto/mod.ts";
import { encodeBase64 } from "https://deno.land/std@0.204.0/encoding/base64.ts";

const MethodValidator = z.enum(["post", "get", "delete", "options", "put"]);

const RequestValidator = z.object({
  url: z.string(),
  data: z.unknown(),
  headers: z.record(z.string()),
  method: MethodValidator,
});

const HeaderInputValueValidator = z.union([
  z.string(),
  z.string().array(),
  z.boolean(),
  z.number(),
  z.null(),
  z.undefined(),
  z.instanceof(axios.AxiosHeaders),
]);

const ResponseValidator = z.object({
  data: z.unknown(),
  headers: z.record(HeaderInputValueValidator).or(z.instanceof(axios.AxiosHeaders)).transform((headersOrInst) => {
    const headers: Record<string, unknown> = headersOrInst instanceof axios.AxiosHeaders
      ? { ...headersOrInst }
      : headersOrInst;

    return Object.entries(headers).reduce(
      (acc, [k, uncheckedV]) => {
        const vParsed = HeaderInputValueValidator.safeParse(uncheckedV);
        if (!vParsed.success) {
          console.warn(`failed to parse header '${String(uncheckedV)}'('${typeof uncheckedV}'). `, new Error().stack);
          return acc;
        }

        const v = vParsed.data;

        if (v instanceof axios.AxiosHeaders) {
          console.warn(`failed to parse nested AxiosHeaders '${String(v)}' for header '${k}'.`, new Error().stack);
          return acc;
        }

        if (v === null || v === undefined) {
          return acc;
        }
        if (typeof v === "number" || typeof v === "boolean") {
          return { ...acc, [k]: String(v) };
        }
        if (Array.isArray(v)) {
          return { ...acc, [k]: v.join(",") };
        }
        return { ...acc, [k]: v satisfies string };
      },
      {} as Record<string, string>,
    );
  }),
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
  seenRequestHashes: z.string().array(),
});

interface AssertSameNetworkRequestsOptions {
  ctx: Deno.TestContext;
  name?: string;
  ignoreOrder?: boolean;
  expectedRequestHashes?: string[];
}

class CustomErrorBase extends Error {
  constructor(message: string) {
    // 'Error' breaks prototype chain here
    super(message);

    // restore prototype chain
    const actualProto = new.target.prototype;

    Object.setPrototypeOf(this, actualProto);
  }
}

export class NotInContextError extends CustomErrorBase {
  constructor() {
    super(`NotInContextError: not in context`);
  }
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
  const snapshotInstanceId = axiosSnapshotNextFreeId++;

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

  const flushAndClose = async () => {
    await Deno.writeTextFile(fileName, JSON.stringify(CacheValidator.parse(getState().cache), null, 4));
  };

  const assertSameNetworkRequests = async <Result>(
    { ctx, ignoreOrder, expectedRequestHashes, name }: AssertSameNetworkRequestsOptions,
    fn: () => Promise<Result>,
  ): Promise<Result> => {
    const contextName = generateContextName(ctx, name);
    const errorPrefix = `assertSameNetworkRequests(${contextName}):`;

    const { contextId } = stateTransaction(({ txState, setState }) => {
      const callstack = new Error().stack;

      if (callstack === undefined) {
        throw new Error(
          `${errorPrefix} callstack undefined. Error.callstack needed to generate unique IDs and detect duplicate calls to withContext.`,
        );
      }

      if (callstack.includes(getCallStackSnapshotId({ snapshotId: snapshotInstanceId }))) {
        throw new Error(`${errorPrefix} cant have nested contexts`);
      }

      if (contextName in txState().contextIdToCallstack && txState().contextIdToCallstack[contextName] !== callstack) {
        throw new Error(
          `${errorPrefix} called with same name from multiple locations.\n. This is bad because the text needs to be unique.`,
        );
      }

      const contextId = txState().nextFreeStacktraceId;

      const callstackUniqueTag = getCallStackContextId({ contextId, snapshotId: snapshotInstanceId });

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
            seenRequestHashes: [],
          },
        },
        cache: {
          ...s.cache,
          [contextName]: s.cache[contextName] ?? {
            entries: {},
          },
        },
      }));

      return { contextId };
    });

    const wrappedAsyncFn: (f: typeof fn) => Promise<Result> = Function(`
    return async function ${getCallStackContextId({ snapshotId: snapshotInstanceId, contextId })}() {
      const result = await arguments[0]()
      return result
    }
  `)();

    let result: Result;

    const cleanupRunningContext = () => {
      stateTransaction(({ setState }) => {
        setState((s) => ({
          ...s,
          runningContexts: R.omit(
            [getCallStackContextId({ snapshotId: snapshotInstanceId, contextId })],
            s.runningContexts,
          ),
        }));
      });
    };

    try {
      result = await wrappedAsyncFn(fn);
    } catch (e) {
      cleanupRunningContext();
      throw e;
    }

    const error = stateTransaction(({ txState }) => {
      const callstackContextId = getCallStackContextId({ snapshotId: snapshotInstanceId, contextId });

      const runningContext = txState().runningContexts[callstackContextId];
      if (!runningContext) {
        return new Error(`cant find running context with ID '${callstackContextId}'`);
      }
      const cacheContext = txState().cache[runningContext.contextName];

      const { expectedRequestHashes, seenRequestHashes } = runningContext;
      const isRequestListAsExpected = R.equals(runningContext.seenRequestHashes, runningContext.expectedRequestHashes);
      const missingRequestHashes = expectedRequestHashes.filter((x) => !seenRequestHashes.includes(x));

      /* extraRequestHashes should be empty since we throw an error but handling just in case we change semantics later */
      const extraRequestHashes = seenRequestHashes.filter((x) => !expectedRequestHashes.includes(x));

      if (isRequestListAsExpected) {
        return;
      }

      if (missingRequestHashes.length > 0) {
        const existingCacheEntries = Object.values(cacheContext.entries).map(({ request: x }) =>
          `* ${x.method} ${x.url} ${x.headers} ${JSON.stringify(x.data)}`
        ).join("\n");

        return new Error(outdent`
        some expected requests wernt made in context '${runningContext.contextName}'.
        missing request hashes${ignoreOrder ? "(ignore order)" : ""}: ${missingRequestHashes.join(", ")}.
        Expected request hashes${ignoreOrder ? "(ignore order)" : ""}: ${expectedRequestHashes.join(", ")}.
        Seen request hashes(In Order): ${seenRequestHashes.join(", ")}.
        To Fix: move copy the actual request hashes into expected: \`[${
          seenRequestHashes.map((x) => `"${x}"`).join(", ")
        }]\`.

        Existing Cache Entries for Context:
        ${existingCacheEntries}
      `);
      }

      if (extraRequestHashes.length > 0) {
        const existingCacheEntries = Object.values(cacheContext.entries).map(({ request: x }) =>
          `* ${x.method} ${x.url} ${x.headers} ${JSON.stringify(x.data)}`
        ).join("\n");

        return new Error(outdent`
        some unexpected requests were made in context '${runningContext.contextName}'.
        unexpected request hashes${ignoreOrder ? "(ignore order)" : ""}: ${extraRequestHashes.join(", ")}.
        Expected request hashes${ignoreOrder ? "(ignore order)" : ""}: ${expectedRequestHashes.join(", ")}.
        Seen request hashes(In Order): ${seenRequestHashes.join(", ")}.
        To Fix: add the unexpected request hashes into the expected request hashes: \`[${
          extraRequestHashes.map((x) => `"${x}"`).join(", ")
        }]\`.

        Existing Cache Entries for Context:
        ${existingCacheEntries}
      `);
      }

      if (!ignoreOrder) {
        const existingCacheEntries = Object.values(cacheContext.entries).map(({ request: x }) =>
          `* ${x.method} ${x.url} ${x.headers} ${JSON.stringify(x.data)}`
        ).join("\n");

        return new Error(outdent`
        request out of order in context '${runningContext.contextName}'.
        Expected request hashes: ${expectedRequestHashes.join(", ")}.
        Seen request hashes: ${seenRequestHashes.join(", ")}.
        To Fix: copy the actual request hashes into expected: \`[${
          seenRequestHashes.map((x) => `"${x}"`).join(", ")
        }]\`.

        Existing Cache Entries for Context:
        ${existingCacheEntries}
      `);
      }

      return;
    });

    if (error) {
      cleanupRunningContext();
      throw new Error(undefined, { cause: error });
    }

    return result;
  };

  const getRunningStackId = (): string => {
    function escapeRegExp(string: string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
    }

    const groupId = "ContextId";
    const regex = new RegExp(
      `(?<${groupId}>` + escapeRegExp(getCallStackSnapshotId({ snapshotId: snapshotInstanceId })) + "C\\d+)",
    );

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

      const { cacheItem, contextName } = stateTransaction(({ txState, setState }) => {
        const runningContext = txState().runningContexts[runningStackId];
        if (!runningContext) {
          throw new Error(`unexpected error: runningContext not found for stackId: ${runningStackId}`);
        }
        const cacheContext = txState().cache[runningContext.contextName];

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

        setState((s) => ({
          ...s,
          runningContexts: {
            ...s.runningContexts,
            [runningStackId]: {
              ...s.runningContexts[runningStackId],
              seenRequestHashes: [...s.runningContexts[runningStackId].seenRequestHashes, requestHash],
            },
          },
        }));

        return {
          cacheItem: cacheContext.entries[requestHash] as z.infer<typeof CacheItemValidator> | undefined,
          contextName: runningContext.contextName,
        };
      });

      if (cacheItem) {
        return ResponseValidator.parse(cacheItem.response);
      }

      const realResponse = await axios[method].apply(axios, [...realArgs] as any) as AxiosResponse;

      // dont return real response for consistency when retrieving from cache vs real API
      const response = ResponseValidator.parse(
        {
          data: realResponse.data,
          headers: realResponse.headers,
          status: realResponse.status,
        } satisfies z.input<typeof ResponseValidator>,
      );
      deepFreeze(response);

      stateTransaction(({ setState }) => {
        setState((s) => ({
          ...s,
          cache: {
            ...s.cache,
            [contextName]: {
              ...s.cache[contextName],
              entries: {
                ...s.cache[contextName].entries,
                [requestHash]: {
                  request: internalRequest,
                  response,
                },
              },
            },
          },
        }));
      });

      return response;
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

    // testing
    snapshotInstanceId,
    getState,
    getRunningStackId,
  });
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

export const generateContextName = (ctx: Deno.TestContext, name?: string): string => {
  const prefix = ctx.parent ? `'${generateContextName(ctx.parent)}' -> ` : "";
  const postfix = name ? ` -> '${name}'` : "";
  return prefix + ctx.name + postfix;
};

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

export const getCallStackSnapshotId = ({ snapshotId }: { snapshotId: number }) => {
  return "AS$I" + snapshotId + "$";
};

export const getCallStackContextId = ({ snapshotId, contextId }: { snapshotId: number; contextId: number }) => {
  return getCallStackSnapshotId({ snapshotId }) + "C" + contextId;
};
