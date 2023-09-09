import { __META__ } from "../generated.ts";
import { COLLECTION_NAMES, CollHelperInternalArgs } from "./common.ts";
import { collectionHelpers as findManyCollectionHelpers } from "./find-many.ts";
import { collectionHelpers as createCollectionHelpers } from "./create.ts";
import { createHubspotAxios, CreateHubspotAxiosConfig } from "../rest.ts";
import { R } from "./deps.ts";

const helpers = [
  findManyCollectionHelpers,
  createCollectionHelpers,
] as const;

type EnrichedHubspotClient = {
  [K in COLLECTION_NAMES]: ReturnType<typeof buildClientCollection<K>>;
};

interface CreateHubspotClientConfig extends CreateHubspotAxiosConfig {}

export const createHubspotClient = (
  config: CreateHubspotClientConfig,
): EnrichedHubspotClient => {
  const client = createHubspotAxios(config);
  return R.mapObjIndexed(
    (_, collectionName) => buildClientCollection({ collectionName, client }),
    __META__.collectionProperties,
  ) as any;
};

const buildClientCollection = <Name extends COLLECTION_NAMES>(
  internalArgs: CollHelperInternalArgs<Name>,
) => {
  return helper(internalArgs, {}, helpers);
};

type F = <Name extends COLLECTION_NAMES>(
  arg: CollHelperInternalArgs<Name>,
) => any;

const helper = <
  Name extends COLLECTION_NAMES,
  Results extends object,
  Head extends F,
  Rest extends F[],
  Helpers extends readonly [Head, ...Rest],
>(
  internalArgs: CollHelperInternalArgs<Name>,
  results: Results,
  [head, ...rest]: Helpers,
): ArrayMerge2<Helpers> => {
  const newResults = { ...results, ...head(internalArgs) };
  const [newHead, ...newRest] = rest;
  if (newHead) {
    helper(internalArgs, newResults, [newHead, ...newRest]);
  }
  return newResults;
};

type ArrayMerge2<LL extends readonly F[]> = ArrayMergeHelper2<{}, LL>;
type ArrayMergeHelper2<
  Result extends Record<string, any>,
  LL extends readonly F[],
> = LL extends readonly [infer Head extends F, ...infer Rest extends F[]]
  ? ArrayMergeHelper2<Result & ReturnType<Head>, Rest>
  : Result;
