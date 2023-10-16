import { createHubModelClient } from "../../lib/client.ts";
import { axios } from "../../deps.ts";
import { getConfig } from "../../env.ts";

export const client = createHubModelClient({ axios: axios.create(), accessToken: getConfig().HUBSPOT_TOKEN });
