import { AxiosInstance, z } from "./deps.ts";
import { CollectionValidatorBaseV2, WhereValidatorBase } from "./where.ts";


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

type SelectArgHelper = z.ZodUnion<readonly [z.ZodLiteral<string>, ...z.ZodLiteral<string>[]]>;
// deno-lint-ignore no-empty-interface
export interface GeneratedSelectArgValidator extends z.ZodRecord<SelectArgHelper, z.ZodLiteral<true>> {}

export interface GeneratedCollection {
  SelectArgValidator: GeneratedSelectArgValidator;
  WhereArgValidator: WhereValidatorBase,
  InstanceValidator: z.ZodObject<any>;
}

export const verifyCollection = <const C extends GeneratedCollection>(col: C): C => col;

export interface GeneratedHubspotSchema {
  collections: Record<string, GeneratedCollection>;
}

export const verifySchema = <const S extends GeneratedHubspotSchema>(schema: S): S => schema;

export type HubspotFieldType =
  | "string"
  | "datetime"
  | "date"
  | "phone_number"
  | "bool"
  | "number"
  | "enumeration";
