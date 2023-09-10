import { createHubspotClient } from "../../lib/index.ts";
import { getConfig } from "../../env.ts";

export const client = createHubspotClient({ accessToken: getConfig().HUBSPOT_TOKEN });
