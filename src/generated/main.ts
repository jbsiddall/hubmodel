import { definition as collection_tickets } from "./$tickets.ts";
import { definition as collection_contacts } from "./$contacts.ts";
import { definition as collection_tasks } from "./$tasks.ts";
import { z } from "../lib/deps.ts";
import {
  createHubModelClient as _createHubModelClient,
  type HubModelClient as HubModelClientInterface,
  type HubModelClientConfig,
} from "../lib/client.ts";
import { CollectionInstance, type GeneratedHubspotSchema, verifySchema } from "../lib/common.ts";

export { type HubModelClientConfig } from "../lib/client.ts";
const schema = verifySchema({
  collections: {
    tickets: collection_tickets,
    contacts: collection_contacts,
    tasks: collection_tasks,
  },
});

export interface HubModelClient extends HubModelClientInterface<typeof schema> {
}

export interface ticketsInstance<
  Properties extends keyof z.infer<(typeof schema)["collections"]["tickets"]["InstanceValidator"]>,
> extends CollectionInstance<(typeof schema)["collections"]["tickets"], Properties> {
}

export interface contactsInstance<
  Properties extends keyof z.infer<(typeof schema)["collections"]["contacts"]["InstanceValidator"]>,
> extends CollectionInstance<(typeof schema)["collections"]["contacts"], Properties> {
}

export interface tasksInstance<
  Properties extends keyof z.infer<(typeof schema)["collections"]["tasks"]["InstanceValidator"]>,
> extends CollectionInstance<(typeof schema)["collections"]["tasks"], Properties> {
}

export function createHubModelClient(config: HubModelClientConfig): HubModelClient {
  return _createHubModelClient({ schema, config });
}
