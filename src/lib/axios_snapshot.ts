import { AxiosInstance, AxiosResponse, R, z } from "./deps.ts";

const MethodValidator = z.enum(["post", "get", "delete", "options", "put"]);

const CacheItemValidator = z.object({
  request: z.object({
    url: z.string(),
    data: z.unknown(),
    method: MethodValidator,
  }),
  response: z.object({
    data: z.unknown(),
    headers: z.object({}).passthrough(),
    status: z.number(),
  }),
});

const CacheValidator = z.array(CacheItemValidator);

let cache: z.infer<typeof CacheValidator> = [];
const updateMode = Deno.args.map((x) => x.toLocaleLowerCase()).includes("--update");

export const create = (axios: AxiosInstance): AxiosInstance => {
  return updateMode ? updateAxiosSnapshot(axios) : readOnlyAxios();
};

const readOnlyAxios = (): AxiosInstance => {
  return {
    defaults: { headers: {} },
    post(url, data) {
      const cacheItem = getFromCache({ url, data, method: "post" });
      if (!cacheItem) {
        throw new Error(`axios cache miss: POST ${url} ${JSON.stringify(data)}`);
      }
      return Promise.resolve(cacheItem.response);
    },
    put(url, data) {
      const cacheItem = getFromCache({ url, data, method: "put" });
      if (!cacheItem) {
        throw new Error(`axios cache miss: PUT ${url} ${JSON.stringify(data)}`);
      }
      return Promise.resolve(cacheItem.response);
    },
    get(url) {
      const cacheItem = getFromCache({ url, data: null, method: "get" });
      if (!cacheItem) {
        throw new Error(`axios cache miss: GET ${url}`);
      }
      return Promise.resolve(cacheItem.response);
    },
    delete(url) {
      const cacheItem = getFromCache({ url, data: null, method: "delete" });
      if (!cacheItem) {
        throw new Error(`axios cache miss: DELETE ${url}`);
      }
      return Promise.resolve(cacheItem.response);
    },
    options(url) {
      const cacheItem = getFromCache({ url, data: null, method: "options" });
      if (!cacheItem) {
        throw new Error(`axios cache miss: OPTIONS ${url}`);
      }
      return Promise.resolve(cacheItem.response);
    },
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
        cache.push(CacheItemValidator.parse({
          request: { method: methodResult.data, url, data },
          response: result,
        } as z.infer<typeof CacheItemValidator>));
        return result;
      };
    },
  });
};

const getFromCache = (matcher: z.infer<typeof CacheValidator>[number]["request"]) => {
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
