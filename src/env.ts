import { z } from "./deps.ts";

const ENV_HUBSPOT_TOKEN = "HUBSPOT_TOKEN";

const ConfigValidator = z.object({
  [ENV_HUBSPOT_TOKEN]: z.string(),
});

export const getConfig = () =>
  ConfigValidator.parse({
    [ENV_HUBSPOT_TOKEN]: Deno.env.get(ENV_HUBSPOT_TOKEN),
  });
