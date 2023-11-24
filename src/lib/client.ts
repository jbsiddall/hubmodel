import { CollectionName, CollHelperInternalArgs, GeneratedHubspotSchema } from "./common.ts";
import { collectionHelpers as findManyCollectionHelpers } from "./find_many.ts";
import { collectionHelpers as createCollectionHelpers } from "./create.ts";
import { configureAxios, CreateHubspotAxiosConfig } from "../rest.ts";
import { z } from "./deps.ts";

const createCollectionClient = <Schema extends GeneratedHubspotSchema, Name extends CollectionName<Schema>>(
  args: CollHelperInternalArgs<Schema, Name>,
) => ({
  ...findManyCollectionHelpers(args),
  ...createCollectionHelpers(args),
});

type CollectionClientBase = ReturnType<typeof createCollectionClient<GeneratedHubspotSchema, string>>;

export type HubModelClient<Schema extends GeneratedHubspotSchema> = {
  [K in CollectionName<Schema>]: ReturnType<typeof createCollectionClient<Schema, K>>;
};

export interface HubModelClientConfig extends CreateHubspotAxiosConfig {
}

export interface CreateHubModelClientParamsBase {
  config: HubModelClientConfig;
  schema: GeneratedHubspotSchema;
}

export const createHubModelClient = <
  const Params extends CreateHubModelClientParamsBase,
  Schema extends Params["schema"],
>({ config, schema }: Params): HubModelClient<Schema> => {
  configureAxios(config);

  const cachedCollectionClients: Record<string, CollectionClientBase> = {};

  return new Proxy({}, {
    get(_, collectionName: string) {
      if (!(collectionName in schema.collections)) {
        throw new Error(`no collection "${collectionName}"`);
      }
      if (!(collectionName in cachedCollectionClients)) {
        cachedCollectionClients[collectionName] = createCollectionClient({
          collectionName,
          client: config.axios,
          schema: schema,
        });
      }
      return cachedCollectionClients[collectionName];
    },
  }) as any;
};

interface ManualSchemaDefinition {
  collections: Record<string, z.ZodObject<any>>;
}

type TransformDefToSchema<Def extends ManualSchemaDefinition> = {
  [Col in keyof Def["collections"]]: Def["collections"][Col] extends z.ZodObject<infer Shape extends z.ZodRawShape> ? {
      SelectArgValidator: { [Field in keyof Shape]?: true };
      WhereArgValidator: any; // TODO implement
      InstanceValidator: Def["collections"][Col];
    }
    : never;
};

export const createHubModelSchemaManually = <const SchemaDef extends ManualSchemaDefinition>(
  def: SchemaDef,
): TransformDefToSchema<SchemaDef> => {
  return {} as any;
};

// export const createHubModelClient = (config: HubModelClientConfig, collections: GeneratedCollections): HubModelUntypedClient => {
// }

// export const createUntypedHubModelClient = (config: HubModelClientConfig): HubModelClient => {
// }
