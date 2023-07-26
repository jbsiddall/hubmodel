import {Client} from "@hubspot/api-client"
export {Client} from "@hubspot/api-client"
import {__META__} from "../generated"
import {ZodType, z} from "zod"
import R from 'ramda'

export type META = typeof __META__
export type COLLECTION_NAMES = keyof META['collectionProperties']
export type ZOD_COLLECTIONS = {[K in COLLECTION_NAMES]: z.infer<META['collectionProperties'][K]>}


export type SelectArg<Name extends COLLECTION_NAMES> = {[K in keyof ZOD_COLLECTIONS[Name]]?: true}
export type DefaultSelectArg<Name extends COLLECTION_NAMES> = {[K in keyof ZOD_COLLECTIONS[Name]]: true}



export interface CollectionInstance<Name extends COLLECTION_NAMES, Properties extends SelectArg<Name>> {
    id: string,
    properties:  {[K in keyof ZOD_COLLECTIONS[Name] as Properties[K] extends true ? K : never]: ZOD_COLLECTIONS[Name][K]},
    createdAt: Date
    updatedAt: Date
    archived: boolean
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
    collectionName: Name
    client: Client
}
