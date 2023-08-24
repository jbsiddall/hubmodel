import { __META__ } from "../generated"
import {
    COLLECTION_NAMES,
    CollHelperInternalArgs
} from './common'
import { collectionHelpers as findManyCollectionHelpers } from './find-many'
import {createHubspotAxios, CreateHubspotAxiosConfig} from '../rest'
import R from 'ramda'

const helpers = [
    findManyCollectionHelpers
] as const

type EnrichedHubspotClient = { [K in COLLECTION_NAMES]: ReturnType<typeof buildClientCollection<K>> }

interface CreateHubspotClientConfig extends CreateHubspotAxiosConfig {}

export const createHubspotClient = (config: CreateHubspotClientConfig): EnrichedHubspotClient => {
    const client = createHubspotAxios(config)

    return R.mapObjIndexed((_, collectionName) => buildClientCollection({ collectionName, client }), __META__.collectionProperties) as any
}

const buildClientCollection = <Name extends COLLECTION_NAMES>(internalArgs: CollHelperInternalArgs<Name>) => {
    return R.mergeAll(helpers.map(h => h(internalArgs)))
}
