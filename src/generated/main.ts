import { definition as collection_contacts } from "./$contacts.ts";
import { definition as collection_deals } from "./$deals.ts";
import { type HubModelClientConfig, type HubModelClient as HubModelClientInterface, createHubModelClient as _createHubModelClient } from "../lib/client.ts";
import { type GeneratedHubspotSchema, verifySchema, CollectionInstance } from "../lib/common.ts";
import { z } from "../lib/deps.ts"

export { type HubModelClientConfig } from "../lib/client.ts";
const schema = verifySchema({
        collections: {
            contacts: collection_contacts,
            deals: collection_deals
        }
    });

export interface HubModelClient extends HubModelClientInterface<typeof schema> {
}

export interface contactsInstance<Properties extends keyof z.infer<(typeof schema)["collections"]["contacts"]["InstanceValidator"]>> extends CollectionInstance<(typeof schema)["collections"]["contacts"], Properties> {
}

export interface dealsInstance<Properties extends keyof z.infer<(typeof schema)["collections"]["deals"]["InstanceValidator"]>> extends CollectionInstance<(typeof schema)["collections"]["deals"], Properties> {
}

export function createHubModelClient(config: HubModelClientConfig): HubModelClient {
    return _createHubModelClient({schema, config})
}
