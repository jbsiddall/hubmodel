import {Client} from "@hubspot/api-client"
import {createHubspotClient} from "./src/client"
import {config} from 'dotenv'
config()

const client = new Client({accessToken: process.env.HUBSPOT_TOKEN})
const betterClient = createHubspotClient(client)

const main = async () => {
    const results = await betterClient.contacts.findMany({select: {address: true, hs_createdate: true}})
    betterClient.contacts.findMany({select: {address: true}})
    console.log('results', results[0].properties)
}

main()