import {
    COLLECTION_NAMES,
    CollHelperInternalArgs,
    ZOD_COLLECTIONS,
} from './common.ts'
import { __META__ } from '../generated.ts'


export const collectionHelpers = <Name extends COLLECTION_NAMES>(internalArgs: CollHelperInternalArgs<Name>) => ({
    create(args: CreateArgs<Name>) { return create(internalArgs, args) }
})

type CreateArgs<Name extends COLLECTION_NAMES> = {
    data: Partial<ZOD_COLLECTIONS[Name]>
}

const create = <Name extends COLLECTION_NAMES>(
    internalArgs: CollHelperInternalArgs<Name>,
    args: CreateArgs<Name>) => {
}
