import { CollectionName, CollHelperInternalArgs, GeneratedHubspotSchema } from "./common.ts";
import { collectionHelpers as findManyCollectionHelpers } from "./find_many.ts";
import { collectionHelpers as createCollectionHelpers } from "./create.ts";
import { configureAxios, CreateHubspotAxiosConfig } from "../rest.ts";
import { R } from "./deps.ts";

const createCollectionClient = <Schema extends GeneratedHubspotSchema, Name extends CollectionName<Schema>>(
  args: CollHelperInternalArgs<Schema, Name>,
) => ({
  ...findManyCollectionHelpers(args),
  ...createCollectionHelpers(args),
});

export type HubModelClient<Schema extends GeneratedHubspotSchema> = {
  [K in CollectionName<Schema>]: ReturnType<typeof createCollectionClient<Schema, K>>;
};

export interface HubModelClientConfig extends CreateHubspotAxiosConfig {
}

export interface CreateHubModelClientParamsBase {
  config: HubModelClientConfig;
  schema?: GeneratedHubspotSchema;
}

export const createHubModelClient = <
  const Params extends CreateHubModelClientParamsBase,
  Schema extends Params["schema"],
>({ config, schema }: Params): HubModelClient<Schema extends undefined ? GeneratedHubspotSchema : Schema> => {
  configureAxios(config);
  return new Proxy({}, {
    get(target, collectionName: string) {
      if (schema && !(collectionName in schema.collections)) {
        throw new Error(`no collection "${collectionName}"`);
      }
    },
  });
  return R.mapObjIndexed(
    (_, collectionName) => createCollectionClient({ collectionName, client: config.axios, schema: schema }),
    schema.collections,
  ) as any;
};

// export const createHubModelClient = (config: HubModelClientConfig, collections: GeneratedCollections): HubModelUntypedClient => {
// }

// export const createUntypedHubModelClient = (config: HubModelClientConfig): HubModelClient => {
// }
