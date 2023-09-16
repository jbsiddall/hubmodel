import {
  COLLECTION_NAMES,
  CollectionInstance,
  CollHelperInternalArgs,
  DefaultSelectArg,
  META,
  NoExtraKeys,
  SelectArg,
  WhereArg,
} from "./common.ts";
import { z } from "./deps.ts";
import { searchObjects } from "../rest.ts";
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
    { select, take, skip }: NoExtraKeys<FindManyArgsBase<Name>, Arg>,
  ): Promise<CollectionInstance<Name, Helper<Name, Arg["select"]>>[]> => {
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
      after: skip as any as number,
      limit: take as any as number,
    });

    const RawValidator: META["collectionProperties"][Name] = __META__.collectionProperties[collectionName];
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
  findMany: findMany(internalArgs),
});
