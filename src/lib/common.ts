import { AxiosInstance, z } from "./deps.ts";

/**
 * ensures that a sub type doesn't have any extra keys not in the superclass
 * Scenario where this is needed:
 * when creating the `SelectArg` type we need an object with all properties in a collection mapping to true.
 * however because we have a type that extends this, then the type can have extra keys and still technically extend it so there's
 * no errors. we want errors when extra keys are added that there's not a property for.
 */
export type NoExtraKeys<Super extends object, Sub extends Super> = {
  [K in keyof Sub as K extends keyof Super ? K : never]: Sub[K];
};

// export type SelectArg<Name extends COLLECTION_NAMES> = {
//   [K in keyof ZOD_COLLECTIONS[Name]]?: true;
// };

// export type WhereArg<Name extends COLLECTION_NAMES> = {
//   [K in keyof ZOD_COLLECTIONS[Name]]?: Partial<FieldWhereArg<ZOD_COLLECTIONS[Name][K]>>;
// };

type WhereFieldType = string | null | number | Date | boolean;
export interface FieldWhereArg<FieldType extends WhereFieldType> {
  equals?: FieldType | null;
  not?: FieldType | null;
}

export type DefaultSelectArg<Name extends COLLECTION_NAMES> = Record<string, never>;

export interface CollectionInstance<
  Col extends GeneratedCollection,
  Properties extends keyof z.infer<Col["InstanceValidator"]>,
> {
  id: string;
  properties: Pick<Col["InstanceValidator"], Properties>;
  createdAt: Date;
  updatedAt: Date;
  archived: boolean;
}

// interface CollectionInstance<Name extends COLLECTION_NAMES, SelectedProperties extends (keyof ZOD_COLLECTIONS[Name]) = keyof ZOD_COLLECTIONS[Name]
//     id: string,
//     properties: Pick<ZOD_COLLECTIONS[Name], SelectedProperties>
//     createdAt: Date
//     updatedAt: Date
//     archived: boolean
// }

// interface ClientCollection<Name extends COLLECTION_NAMES> {
//     findMany: FindMany<Name>
// }

export type CollectionName<Schema extends GeneratedHubspotSchema> = keyof Schema["collections"] & string;

export interface CollHelperInternalArgs<Schema extends GeneratedHubspotSchema, Name extends CollectionName<Schema>> {
  collectionName: Name;
  client: AxiosInstance;
  schema: Schema;
}

export interface GeneratedCollection {
  SelectArgValidator: z.ZodType;
  WhereArgValidator: z.ZodType;
  InstanceValidator: z.ZodType;
}

export interface GeneratedHubspotSchema {
  collections: Record<string, GeneratedCollection>;
}

export const verifySchema = <const S extends GeneratedHubspotSchema>(schema: S): S => schema;
