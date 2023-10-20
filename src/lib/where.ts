import { R, z } from "../deps.ts";
import { Filter, FilterGroup } from "../rest.ts";
import { GeneratedCollection, HubspotFieldType } from "./common.ts";

const createFieldClause = <G extends z.ZodType>(fieldType: G) =>
  z.object({
    equals: fieldType.optional().nullable(),
    not: fieldType.optional().nullable(),
  });

const FieldClauseBase = createFieldClause(z.any());
const CollectionSimpleFieldBase = z.record(FieldClauseBase);

const createCollectionClause = <Z extends z.ZodObject<any>>(validator: Z) =>
  z.union([
    validator,
    z.object({
      OR: z.array(z.union([validator, z.object({ AND: z.array(validator) })])),
      AND: z.array(validator),
    }),
  ]);

const v = z.union([
  z.object({ a: z.number() }).strict(),
  z.object({ b: z.number() }).strict(),
]);

export const FIELD_VALIDATORS = {
  string: createFieldClause(z.string()),
  enumeration: createFieldClause(z.string()),
  phone_number: createFieldClause(z.string()),
  number: createFieldClause(z.number()),
  date: createFieldClause(z.date()),
  datetime: createFieldClause(z.date()),
  bool: createFieldClause(z.boolean()),
} as const;

type CollectionValidatorBase = z.ZodObject<Record<string, (typeof FIELD_VALIDATORS)[keyof typeof FIELD_VALIDATORS]>>;

type CollectionWhere = CollectionValidatorBase extends z.ZodObject<infer G> ? G : never;

export const verifyCollectionSimpleFieldBase = <X extends CollectionValidatorBase>(x: X): X => x;

export const createCollectionWhereValidator = <X extends CollectionValidatorBase>(x: X) => {
  return createCollectionClause(x);
};
type CollectionValidatorBaseV2 = ReturnType<typeof createCollectionWhereValidator<CollectionValidatorBase>> extends
  z.ZodType<infer G> ? G : never;

export const whereClauseToFilterGroups = (where: CollectionValidatorBaseV2): FilterGroup[] => {
  const x = where["OR"];
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
          newPartial.push({
            propertyName: key,
            operator: "HAS_PROPERTY",
          });
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
