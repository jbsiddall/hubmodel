import {
  COLLECTION_NAMES,
  CollectionInstance,
  CollHelperInternalArgs,
  META,
  SelectArg,
} from "./common.ts";
import { z } from "./deps.ts";
import { searchObjects } from "../rest.ts";
import { __META__ } from "../generated.ts";

interface FindManyArgs<
  Name extends COLLECTION_NAMES,
  S extends SelectArg<Name>,
> {
  select?: S;
  take?: number;
  skip?: number;
}

const SimpleObjectValidator = z.object({
  id: z.string(),
  properties: z.record(z.unknown()),
  createdAt: z.string().transform(Date),
  updatedAt: z.string().transform(Date),
  archived: z.boolean(),
});

const findMany = async <
  Name extends COLLECTION_NAMES,
  Props extends SelectArg<Name>,
>(
  { collectionName, client }: CollHelperInternalArgs<Name>,
  { select, take, skip }: FindManyArgs<Name, Props>,
): Promise<CollectionInstance<Name, Props>[]> => {
  if (take !== undefined && take < 0) {
    throw new Error(`take must be positive`);
  }
  if (skip !== undefined && skip < 0) {
    throw new Error(`skip must be positive`);
  }

  const results = await searchObjects({
    axios: client,
    objectType: collectionName,
    properties: Object.keys(select ?? {}),
    filterGroups: [],
    after: skip as any as number,
    sorts: [],
    limit: take as any as number,
  });

  const RawValidator: META["collectionProperties"][Name] =
    __META__.collectionProperties[collectionName];
  // TODO remove any from following line
  const collectionValidator: typeof RawValidator = select === undefined
    ? RawValidator
    : (RawValidator.pick as any)(select);

  const rows = results.map((row) => SimpleObjectValidator.parse(row)).map(
    (row) => ({
      ...row,
      properties: collectionValidator.parse(row.properties),
    }),
  );
  return rows as any;
};

export const collectionHelpers = <Name extends COLLECTION_NAMES>(
  internalArgs: CollHelperInternalArgs<Name>,
) => ({
  findMany<S extends SelectArg<Name>>(args: FindManyArgs<Name, S>) {
    return findMany(internalArgs, args);
  },
});
