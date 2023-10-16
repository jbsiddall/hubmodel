import {
  CollectionInstance,
  CollectionName,
  CollHelperInternalArgs,
  DefaultSelectArg,
  GeneratedCollection,
  GeneratedHubspotSchema,
  NoExtraKeys,
} from "./common.ts";
import { R, z } from "./deps.ts";
import { Filter, FilterGroup, searchObjects } from "../rest.ts";

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
  { collectionName, client }: CollHelperInternalArgs<Schema, Name>,
) =>
async <const Arg extends FindManyArgsBase<Schema["collections"][Name]>>(
  { select, where, take, skip }: Arg,
): Promise<CollectionInstance<Schema["collections"][Name], keyof Arg["select"]>[]> => {
  if (take !== undefined && take < 0) {
    throw new Error(`take must be positive`);
  }

  if (skip !== undefined && skip < 0) {
    throw new Error(`skip must be positive`);
  }

  const filterGroups = whereClauseToFilterGroups({ where });

  const results = await searchObjects({
    axios: client,
    objectType: collectionName,
    properties: Object.keys(select ?? {}),
    filterGroups,
    after: skip as any as number,
    limit: take as any as number,
  });

  const RawValidator: META["collectionProperties"][Name] = __META__.collectionProperties[collectionName];
  // TODO remove any from following line
  const collectionValidator: typeof RawValidator = (RawValidator.pick as any)(select ?? []);

  const rows = results.map((row) => SimpleObjectValidator.parse(row)).map(
    (row) => ({
      ...row,
      properties: collectionValidator.parse(row.properties),
    }),
  );
  return rows as any;
};

interface WhereClauseToFilterGroupsArgs<Name extends COLLECTION_NAMES> {
  where: WhereArg<Name> | undefined;
}

const whereClauseToFilterGroups = <Name extends COLLECTION_NAMES, Arg extends WhereClauseToFilterGroupsArgs<Name>>(
  { where }: Arg,
): FilterGroup[] => {
  const keys = where === undefined ? [] : R.keys(where);
  const filters: Filter[] = keys.reduce(
    (partialResults, key) => {
      if (typeof key === "symbol" || typeof key === "number") {
        throw new Error(`where clause key '${String(key)}' must be of type string`);
      }

      if (!where) {
        return partialResults;
      }

      const filter = where[key];

      if (!filter) {
        return partialResults;
      }

      const newPartial = [...partialResults];

      if ("equals" in filter) {
        if (filter.equals === null) {
          newPartial.push(
            { propertyName: key, operator: "NOT_HAS_PROPERTY" },
          );
        } else {
          newPartial.push(
            { propertyName: key, operator: "EQ", value: `${String(filter.equals)}` },
          );
        }
      }

      if ("not" in filter) {
        if (filter.not === null) {
          newPartial.push({ propertyName: key, operator: "HAS_PROPERTY" });
        } else {
          newPartial.push({
            propertyName: key,
            operator: "NEQ",
            value: `${String(filter.not)}`,
          });
        }
      }

      return newPartial;
    },
    [] as Filter[],
  );

  if (filters.length === 0) {
    return [];
  }

  return [{ filters }];
};

export const collectionHelpers = <Schema extends GeneratedHubspotSchema, Name extends CollectionName<Schema>>(
  internalArgs: CollHelperInternalArgs<Schema, Name>,
) => ({
  findMany: findMany(internalArgs),
});
