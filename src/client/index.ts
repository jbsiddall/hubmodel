import {__META__} from "../generated"
import {
    COLLECTION_NAMES,
    Client,
    CollHelperInternalArgs
} from './common'
import {collectionHelpers} from './find-many'
import R from 'ramda'

const helpers = [
    collectionHelpers
] as const

type EnrichedHubspotClient = { [K in COLLECTION_NAMES]: ReturnType<typeof buildClientCollection<K>> }

export const createHubspotClient = (client: Client): EnrichedHubspotClient => {
    return R.mapObjIndexed((_, collectionName) => buildClientCollection({collectionName,client}), __META__.collectionProperties) as any
}

const buildClientCollection = <Name extends COLLECTION_NAMES>(internalArgs: CollHelperInternalArgs<Name>) => {
    return R.mergeAll(helpers.map(h => h(internalArgs)))
}