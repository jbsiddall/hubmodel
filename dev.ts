import {Client} from "@hubspot/api-client"
import {enrichHubspotClient} from "./src/client"
import {config} from 'dotenv'
config()

const client = new Client({accessToken: process.env.HUBSPOT_TOKEN})
const betterClient = enrichHubspotClient(client)

const main = async () => {
    const results = await betterClient.crm.contacts.getAll(undefined, undefined, ['email'])
    console.log(results)
    const bla = results[0].properties
}

type AX = ["1", "2", "3"]
type B = AX[number]

/*
    properties: {
      createdate: '2023-07-16T17:37:35.683Z',
      email: 'bh@hubspot.com',
      firstname: 'Brian',
      hs_object_id: '51',
      lastmodifieddate: '2023-07-16T17:37:54.419Z',
      lastname: 'Halligan (Sample Contact)'
    },
*/

main()