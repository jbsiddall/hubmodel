import { CollectionName, CollHelperInternalArgs, GeneratedCollection, GeneratedHubspotSchema } from "./common.ts";

export const collectionHelpers = <Schema extends GeneratedHubspotSchema, Name extends CollectionName<Schema>>(
  internalArgs: CollHelperInternalArgs<Schema, Name>,
) => ({
  create(args: CreateArgs<Schema["collections"][Name]>) {
    return create(internalArgs, args);
  },
});

type CreateArgs<Col extends GeneratedCollection> = {
  data: { implementMe: string };
};

const create = <Schema extends GeneratedHubspotSchema, Name extends CollectionName<Schema>>(
  internalArgs: CollHelperInternalArgs<Schema, Name>,
  args: CreateArgs<Schema["collections"][Name]>,
) => {
};
