import { createHubspotClient } from "../../lib/index.ts"
import { getConfig } from "../../env.ts"

const client = createHubspotClient({ accessToken: getConfig().HUBSPOT_TOKEN })

const results = await client.contacts.findMany({ select: { address: true, hs_createdate: true, email: true } })
console.log('results', results)