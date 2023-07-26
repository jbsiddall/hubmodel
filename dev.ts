import {Client} from "@hubspot/api-client"
import {createHubspotClient} from "./src/client"
import {config} from 'dotenv'
config()

const client = new Client({accessToken: process.env.HUBSPOT_TOKEN})
const betterClient = createHubspotClient(client)

const main = async () => {
    const results = await betterClient.contacts.findMany({select: {address: true, hs_createdate: true}})
    console.log('results', results[0].properties)
}

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