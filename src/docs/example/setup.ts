import { createHubspotClient } from "../../lib/index.ts";
import { axios } from "../../deps.ts";
import { getConfig } from "../../env.ts";

export const client = createHubspotClient({ axios: axios.create(), accessToken: getConfig().HUBSPOT_TOKEN });
