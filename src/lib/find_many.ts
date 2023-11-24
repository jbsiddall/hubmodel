import {
  CollectionInstance,
  CollectionName,
  CollHelperInternalArgs,
  GeneratedCollection,
  GeneratedHubspotSchema,
} from "./common.ts";
import { z } from "./deps.ts";
import { searchObjects } from "../rest.ts";
import { whereClauseToFilterGroups } from "./where.ts";

interface FindManyArgsBase<Col extends GeneratedCollection> {
  select?: z.infer<Col["SelectArgValidator"]>;
  where?: z.infer<Col["WhereArgValidator"]>;
  take?: number;
  skip?: number;
}

// type ValidateFindManyArgs<Args extends FindManyArgsBase<COLLECTION_NAMES>> = Args extends FindManyArgsBase<infer Name>
//   ? {
//     select?: Args["select"] extends (infer S extends SelectArg<Name>) ? NoExtraKeys<SelectArg<Name>, S> : "damm";
//     where?: Args["where"] extends (infer S extends WhereArg<Name>) ? NoExtraKeys<WhereArg<Name>, S> : undefined;
//     take?: number;
//     skip?: number;
//   }
//   : never;

const SimpleObjectValidator = z.object({
  id: z.string(),
  properties: z.record(z.unknown()),
  createdAt: z.string().transform((x) => new Date(x)),
  updatedAt: z.string().transform((x) => new Date(x)),
  archived: z.boolean(),
});

const findMany = <Schema extends GeneratedHubspotSchema, Name extends CollectionName<Schema>>(
  { collectionName, client, schema }: CollHelperInternalArgs<Schema, Name>,
) =>
async <const Arg extends FindManyArgsBase<Schema["collections"][Name]>>(
  { select: selectUnsafe, where: whereUnsafe, take, skip }: Arg,
): Promise<CollectionInstance<Schema["collections"][Name], keyof Arg["select"]>[]> => {
  const col = schema.collections[collectionName];

  if (!col) {
    throw new Error(`no collection ${collectionName}`);
  }

  if (take !== undefined && take < 0) {
    throw new Error(`take must be positive`);
  }

  if (skip !== undefined && skip < 0) {
    throw new Error(`skip must be positive`);
  }

  // TODO handle error
  const select = selectUnsafe
    ? col.SelectArgValidator.parse(selectUnsafe satisfies z.infer<typeof col.SelectArgValidator>)
    : undefined;
  const where = whereUnsafe
    ? col.WhereArgValidator.parse(whereUnsafe satisfies z.infer<typeof col.WhereArgValidator>)
    : undefined;

  const filterGroups = where ? whereClauseToFilterGroups(where) : undefined;

  const results = await searchObjects({
    axios: client,
    objectType: collectionName,
    properties: Object.keys(select ?? {}),
    filterGroups,
    after: skip,
    limit: take,
  });

  const RawValidator = col.InstanceValidator.pick(select ?? {});

  const rows = results.map((row) => SimpleObjectValidator.parse(row)).map(
    (row) =>
      ({
        ...row,
        properties: RawValidator.parse(row.properties),
      }) as CollectionInstance<Schema["collections"][Name], keyof Arg["select"]>,
  );

  return rows;
};

export const collectionHelpers = <Schema extends GeneratedHubspotSchema, Name extends CollectionName<Schema>>(
  internalArgs: CollHelperInternalArgs<Schema, Name>,
) => ({
  findMany: findMany(internalArgs),
});
