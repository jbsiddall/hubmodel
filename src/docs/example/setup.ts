import { axios } from "../../deps.ts";
import { getConfig } from "../../env.ts";
import { createHubModelClient } from "../../generated/main.ts";

export const client = createHubModelClient({
  axios: axios.create(),
  accessToken: getConfig().HUBSPOT_TOKEN,
});
