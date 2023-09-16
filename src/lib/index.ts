import { __META__ } from "../generated.ts";
import { COLLECTION_NAMES, CollHelperInternalArgs } from "./common.ts";
import { collectionHelpers as findManyCollectionHelpers } from "./find_many.ts";
import { collectionHelpers as createCollectionHelpers } from "./create.ts";
import { createHubspotAxios, CreateHubspotAxiosConfig } from "../rest.ts";
import { R } from "./deps.ts";

const createCollectionClient = <Name extends COLLECTION_NAMES>(args: CollHelperInternalArgs<Name>) => ({
  ...findManyCollectionHelpers(args),
  ...createCollectionHelpers(args),
});

type EnrichedHubspotClient = {
  [K in COLLECTION_NAMES]: ReturnType<typeof createCollectionClient<K>>;
};

interface CreateHubspotClientConfig extends CreateHubspotAxiosConfig {}

export const createHubspotClient = (
  config: CreateHubspotClientConfig,
): EnrichedHubspotClient => {
  const client = createHubspotAxios(config);
  return createHubspotClientForTesting(client);
};

export const createHubspotClientForTesting = (
  client: ReturnType<typeof createHubspotAxios>,
): EnrichedHubspotClient => {
  return R.mapObjIndexed(
    (_, collectionName) => createCollectionClient({ collectionName, client }),
    __META__.collectionProperties,
  ) as any;
};
