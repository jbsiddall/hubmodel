import { z } from "./deps.ts";

export const ConfigValidator = z.object({
  environment: z.enum(["node", "deno"]),
  hubspotToken: z.string(),
  collections: z.string().array(),
});
