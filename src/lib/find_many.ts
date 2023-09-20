import {
  COLLECTION_NAMES,
  CollectionInstance,
  CollHelperInternalArgs,
  DefaultSelectArg,
  META,
  NoExtraKeys,
  SelectArg,
  WhereArg,
  ZOD_COLLECTIONS,
} from "./common.ts";
import { R, z } from "./deps.ts";
import { Filter, FilterGroup, searchObjects } from "../rest.ts";
import { __META__ } from "../generated.ts";

interface FindManyArgsBase<Name extends COLLECTION_NAMES> {
  select?: SelectArg<Name>;
  where?: WhereArg<Name>;
  take?: number;
  skip?: number;
}

type ValidateFindManyArgs<Args extends FindManyArgsBase<COLLECTION_NAMES>> = Args extends FindManyArgsBase<infer Name>
  ? {
    select?: Args["select"] extends (infer S extends SelectArg<Name>) ? NoExtraKeys<SelectArg<Name>, S> : "damm";
    where?: Args["where"] extends (infer S extends WhereArg<Name>) ? NoExtraKeys<WhereArg<Name>, S> : undefined;
    take?: number;
    skip?: number;
  }
  : never;

const SimpleObjectValidator = z.object({
  id: z.string(),
  properties: z.record(z.unknown()),
  createdAt: z.string().transform((x) => new Date(x)),
  updatedAt: z.string().transform((x) => new Date(x)),
  archived: z.boolean(),
});

type Helper<Name extends COLLECTION_NAMES, T extends undefined | SelectArg<Name>> = T extends undefined
  ? DefaultSelectArg<Name>
  : Exclude<T, undefined>;
const findMany =
  <Name extends COLLECTION_NAMES>({ collectionName, client }: CollHelperInternalArgs<Name>) =>
  async <const Arg extends FindManyArgsBase<Name>>(
    { select, where, take, skip }: NoExtraKeys<FindManyArgsBase<Name>, Arg>,
  ): Promise<CollectionInstance<Name, Helper<Name, Arg["select"]>>[]> => {
    if (take !== undefined && take < 0) {
      throw new Error(`take must be positive`);
    }

    if (skip !== undefined && skip < 0) {
      throw new Error(`skip must be positive`);
    }

    const filterGroups = whereClauseToFilterGroups({ collectionName, where });

    const results = await searchObjects({
      axios: client,
      objectType: collectionName,
      properties: Object.keys(select ?? {}),
      filterGroups: [
        {
          filters: [
            {
              propertyName: "email",
              operator: "EQ",
              value: "WOW",
            },
          ],
        },
      ],
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
  collectionName: Name;
  where: WhereArg<Name> | undefined;
}

const whereClauseToFilterGroups = <Name extends COLLECTION_NAMES, Arg extends WhereClauseToFilterGroupsArgs<Name>>(
  { collectionName, where }: Arg,
): FilterGroup[] => {
  if (!where) {
    return [];
  }

  const helper = <Prop extends keyof Arg["where"]>(field: Prop): Filter[] => {
    const clause = where[field];

    if (!clause) {
      throw new Error(`where clause for property ${collectionName}.${String(field)} not well defined`);
    }

    if (Object.keys(clause).length !== 1) {
      throw new Error(
        `where clause for ${collectionName}.${String(field)} must have exactly one condition eg "equals"`,
      );
    }

    const x = clause;

    if (clause.equals) {
      if (clause.equals === null) {
        return [
          { propertyName: field, operator: "NOT_HAS_PROPERTY" },
        ];
      } else {
        return [
          { propertyName: field, operator: "EQ", value: `${clause.equals}` },
        ];
      }
    }
    if (clause.not) {
      if (clause.not === null) {
        return [
          { propertyName: field, operator: "HAS_PROPERTY" },
        ];
      }
      return [
        { propertyName: field, operator: "NEQ", value: `${clause.equals}` },
      ];
    }

    return [];
  };

  for (const bloop: Arg["where"][string] in where) {
    const clause = where[bloop];
    if (clause === null || clause === undefined) {
      throw new Error();
    }
    if (typeof bloop === "symbol" || typeof bloop === "number") {
      throw new Error();
    }
    helper(bloop);
  }

  const v = R.keys(where);

  return [
    {
      filters: [...R.flatten(R.values(R.mapObjIndexed(helper as any, where)))],
    },
  ];
};

export const collectionHelpers = <Name extends COLLECTION_NAMES>(
  internalArgs: CollHelperInternalArgs<Name>,
) => ({
  findMany: findMany(internalArgs),
});
