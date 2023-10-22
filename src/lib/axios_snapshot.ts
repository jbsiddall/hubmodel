import { AxiosInstance, AxiosResponse, R, z } from "./deps.ts";
import { v5 as uuid } from "https://deno.land/std@0.202.0/uuid/mod.ts";
import { crypto } from "https://deno.land/std@0.204.0/crypto/mod.ts";
import { encodeBase64 } from "https://deno.land/std@0.204.0/encoding/base64.ts";

const MethodValidator = z.enum(["post", "get", "delete", "options", "put"]);

const RequestValidator = z.object({
  url: z.string(),
  data: z.unknown(),
  headers: z.object({}).passthrough(),
  method: MethodValidator,
  context: z.string().optional(),
});

const ResponseValidator = z.object({
  data: z.unknown(),
  headers: z.object({}).passthrough(),
  status: z.number(),
});

const CacheItemValidator = z.object({
  request: RequestValidator,
  response: ResponseValidator,
});

const CacheItemIdValidator = z.string();

const CacheChangeItemValidator = z.object({
  timestamp: z.number(),
  context: z.string().optional(),
  newItem: CacheItemIdValidator,
  oldItem: CacheItemIdValidator,
});

const CacheLatestValidator = z.object({
  version: z.literal("2023-10-21"),
  items: z.record(CacheItemIdValidator, CacheItemValidator),
  changes: z.array(CacheChangeItemValidator),
  contexts: z.record(z.string()),
});

const CacheV1Validator = z.array(CacheItemValidator);

const CacheValidator = z.union([
  CacheLatestValidator,
  CacheV1Validator.transform<z.infer<typeof CacheLatestValidator>>((items) => ({
    items,
    changes: [],
    version: "2023-10-21",
  })),
]);

let cache: z.infer<typeof CacheValidator> = {
  items: [],
  changes: [],
  version: "2023-10-21",
};
const updateMode = Deno.args.map((x) => x.toLocaleLowerCase()).includes("--update");

type ContextId = string;
export const CONTEXT_PREFIX = "AxiosSnapshotTag$";
const contextLookup: Record<ContextId, ContextText> = {};

export const create = (axios: AxiosInstance): AxiosInstance => {
  return updateMode ? updateAxiosSnapshot(axios) : readOnlyAxios();
};

const readOnlyAxios = (): AxiosInstance => {
  const handler = (method: z.infer<typeof MethodValidator>) => (url: string, data: unknown) => {
    const context = getCurrentContextText();

    const cacheItemFromContext = context === null ? null : getFromCacheByContext(context);
    const cacheItemFromRequest = getFromCacheByRequest({ url, data, method });

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

  return {
    defaults: { headers: {} },
    post: handler("post"),
    put: handler("put"),
    get: handler("get"),
    delete: handler("delete"),
    options: handler("options"),
  } as Partial<AxiosInstance> as any;
};

const updateAxiosSnapshot = (axios: AxiosInstance): AxiosInstance => {
  return new Proxy(axios, {
    get(target, property, receiver) {
      const methodResult = MethodValidator.safeParse(property);
      if (!methodResult.success) {
        return Reflect.get(target, property, receiver);
      }
      return async (url: string, ...args: any[]) => {
        const result = await target[methodResult.data].apply(target, [url, ...args] as any) as AxiosResponse;
        let data: unknown;
        switch (methodResult.data) {
          case "post":
          case "put":
            data = args[0];
            break;
          default:
            data = null;
        }
        const context = getCurrentContextText();

        const existingCacheEntry = getFromCacheByRequest({ url, data, method: methodResult.data });

        let shouldAddToCache = false;

        if (context !== null) {
          if (existingCacheEntry?.request.context !== undefined) {
            if (existingCacheEntry.request.context !== context) {
              throw new Error(
                `axios cache miss for context '${context}' BUT found a matching hit with the context '${existingCacheEntry.request.context}': ${methodResult.data} ${url} ${
                  JSON.stringify(data)
                }`,
              );
            }
          } else {
          }
        } else {
        }

        if (shouldAddToCache) {
          cache.push(CacheItemValidator.parse({
            request: { method: methodResult.data, url, data, context: context ?? undefined },
            response: result,
          } as z.infer<typeof CacheItemValidator>));
        }

        return result;
      };
    },
  });
};

const getFromCacheByContext = (context: string) => {
  return cache.find((item) => {
    if (item.request.context === undefined) {
      return false;
    }
    return R.equals(item.request.context, context);
  }) ?? null;
};

const getFromCacheByRequest = (matcher: z.infer<typeof CacheValidator>[number]["request"]) => {
  const matcherWithoutUndefinedKeys = JSON.parse(JSON.stringify(matcher));
  return cache.find((item) => R.equals(item.request, matcherWithoutUndefinedKeys)) ?? null;
};

export const initCache = () => {
  const rawData = JSON.parse(Deno.readTextFileSync("./network_snapshot.json"));
  cache = CacheValidator.parse(rawData);
};

export const flush = () => {
  if (!updateMode) {
    return;
  }
  Deno.writeTextFileSync("./network_snapshot.json", JSON.stringify(CacheValidator.parse(cache), null, 4));
};

type ContextText = string;
type Callstack = string;
const withContextErrorChecker: Record<ContextText, Callstack> = {};

interface WithContextOptions {
  skipReusedTextCheck: boolean;
}

export const withContext = async <A>(
  text: ContextText,
  fn: () => Promise<A>,
  options?: WithContextOptions,
): Promise<A> => {
  const callstack = new Error().stack;
  if (callstack === undefined) {
    throw new Error(
      "withContext: callstack undefined. Error.callstack needed to generate unique IDs and detect duplicate calls to withContext.",
    );
  }

  if (callstack.includes(CONTEXT_PREFIX)) {
    throw new Error(`withContext: cant have nested contexts`);
  }

  if (!options?.skipReusedTextCheck && text in withContextErrorChecker && withContextErrorChecker[text] !== callstack) {
    throw new Error(
      `withContext called with same text from multiple locations.\n. Text: '${text}'. This is bad because the text needs to be unique.`,
    );
  }

  withContextErrorChecker[text] = callstack;

  const callstackUniqueTag = `${CONTEXT_PREFIX}${await createUniqueContextId(text)}`;

  if (contextLookup[callstackUniqueTag] !== undefined) {
    throw new Error(
      `withContext: callstackUniqueTag already exists. This should never happen. callstackUniqueTag: ${callstackUniqueTag}`,
    );
  }

  const wrappedAsyncFn: (f: typeof fn) => Promise<A> = Function(`
    return async function ${callstackUniqueTag}() {
      const result = await arguments[0]()
      return result
    }
  `)();

  contextLookup[callstackUniqueTag] = text;
  try {
    return await wrappedAsyncFn(fn);
  } finally {
    delete contextLookup[callstackUniqueTag];
  }
};

export const createUniqueContextId = async (seed: string) => {
  const namespace = "ad457a69-b407-403a-8189-eb998a79dd99";
  const data = new TextEncoder().encode(seed);
  const idInUuidFormat = await uuid.generate(namespace, data);
  return idInUuidFormat.replace(/-/g, "");
};

export const getCurrentContextText = (): string | null => {
  const contextId = getCurrentContextId();
  if (contextId === null) {
    return null;
  }
  return contextLookup[contextId] ?? null;
};

export const getCurrentContextId = (): string | null => {
  const groupId = "ContextId";
  const regex = new RegExp(`(?<${groupId}>` + escapeRegExp(CONTEXT_PREFIX) + "\\w+)");

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
  return contextId;
};

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

const generateUniqueRequestId = async (request: z.infer<typeof RequestValidator>) => {
  const key = {
    url: request.url,
    data: request.data,
    method: request.method,
    // TODO possible security issue with Authorization header
    headers: request.headers,
  };
  return encodeBase64(await crypto.subtle.digest("SHA-1", new TextEncoder().encode(JSON.stringify(key))));
};
