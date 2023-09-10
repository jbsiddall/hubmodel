import { __META__ } from "../generated.ts";
import { AxiosInstance, z } from "./deps.ts";

export type META = typeof __META__;
export type COLLECTION_NAMES = keyof META["collectionProperties"];
export type ZOD_COLLECTIONS = {
  [K in COLLECTION_NAMES]: z.infer<META["collectionProperties"][K]>;
};

/**
 * ensures that a sub type doesn't have any extra keys not in the superclass
 * Scenario where this is needed:
 * when creating the `SelectArg` type we need an object with all properties in a collection mapping to true.
 * however because we have a type that extends this, then the type can have extra keys and still technically extend it so there's
 * no errors. we want errors when extra keys are added that there's not a property for.
 */
export type NoExtraKeys<Super extends object, Sub extends object> = {
  [K in keyof Sub as K extends keyof Super ? K : never]: Sub[K];
};

export type SelectArg<Name extends COLLECTION_NAMES> = {
  [K in keyof ZOD_COLLECTIONS[Name]]?: true;
};
export type DefaultSelectArg<Name extends COLLECTION_NAMES> = {
  [K in keyof ZOD_COLLECTIONS[Name]]: true;
};

export interface CollectionInstance<
  Name extends COLLECTION_NAMES,
  Properties extends SelectArg<Name>,
> {
  id: string;
  properties: {
    [
      K in keyof ZOD_COLLECTIONS[Name] as Properties[K] extends true ? K : never
    ]: ZOD_COLLECTIONS[Name][K];
  };
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

export interface CollHelperInternalArgs<Name extends COLLECTION_NAMES> {
  collectionName: Name;
  client: AxiosInstance;
}
