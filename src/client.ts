import {Client} from "@hubspot/api-client"

import {__META__} from "./generated"
import CrmDiscovery from "@hubspot/api-client/lib/src/discovery/crm/CrmDiscovery"
import ContactsDiscovery from "@hubspot/api-client/lib/src/discovery/crm/contacts/ContactsDiscovery"
import { SimplePublicObjectWithAssociations } from "@hubspot/api-client/lib/codegen/crm/contacts"
import {z} from "zod"

type META = typeof __META__
type ZodCollections = {[ColName in keyof META['collecitonProperties']]: z.infer<META['collecitonProperties'][ColName]>}

type EnrichedClientType = Omit<Client, 'crm'> & {
    crm: EnrichedCrm
}

type EnrichedCrm = Omit<CrmDiscovery, 'contacts'> & {
    contacts: EnrichedContactsDiscovery
}


type ContactsGetAllFreeProperties = 'createdate' | 'hs_object_id' | 'lastmodifieddate'

type EnrichedContactsDiscovery = Omit<ContactsDiscovery, 'getAll'> & {
    getAll: <Props extends keyof ZodCollections['contacts'] = 'firstname' | 'lastname' | 'email'>(limit?: number, after?: string, properties?: Props[], propertiesWithHistory?: string[], associations?: string[], archived?: boolean) => Promise<EnrichedObjWithAssoc<ZodCollections['contacts'], Props | ContactsGetAllFreeProperties>[]>
}

type EnrichedObjWithAssoc<Coll, Props extends keyof Coll> = Omit<SimplePublicObjectWithAssociations, 'properties'> & {
    properties: Pick<Coll, Props>
} 


export const enrichHubspotClient = (client: Client): EnrichedClientType => {
    return new Proxy(client, clientHandler) as any
}

const clientHandler: ProxyHandler<Client> = {
    get: (target, prop, receiver) => {
        if (prop === 'crm') {
            return new Proxy(target.crm, crmHandler)
        }
        return (target as any)[prop]
    }
}

const crmHandler: ProxyHandler<CrmDiscovery> = {
    get: (target, prop, receiver) => {

        if (prop === 'contacts') {
            // return new Proxy(target.contacts, )
        }
        return (target as any)[prop]
    }
}

const collectionDiscoveryHandler = {
}