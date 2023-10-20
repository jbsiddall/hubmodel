import { definition as collection_tickets } from "./$tickets.ts";
import { definition as collection_contacts } from "./$contacts.ts";
import { definition as collection_tasks } from "./$tasks.ts";
import {
  createHubModelClient as _createHubModelClient,
  type HubModelClient as HubModelClientInterface,
  type HubModelClientConfig,
} from "../lib/client.ts";
import { type GeneratedHubspotSchema, verifySchema } from "../lib/common.ts";

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

export function createHubModelClient(config: HubModelClientConfig): HubModelClient {
  return _createHubModelClient({ schema, config });
}
