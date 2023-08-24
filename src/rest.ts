import { create as createAxios } from 'axios'
import type { AxiosInstance } from 'axios'
import { z } from "zod"

export interface CreateHubspotAxiosConfig {
    accessToken: string
}

export const createHubspotAxios = (config: CreateHubspotAxiosConfig) => {
    return createAxios({
        baseURL: 'https://api.hubapi.com/',
        headers: {
            Authorization: `Bearer ${config.accessToken}`,
            "Content-Type": "application/json",
        }
    })
}

const GeneralResponseValidator = z.object({
    results: z.array(z.unknown())
})


export const searchObjects = (() => {

    interface Args {
        axios: AxiosInstance
        objectType: string
        properties?: string[],
        filterGroups?: unknown[],
        after?: number,
        sorts?: string[],
        limit?: number,
    }

    return async ({ axios, objectType, properties, filterGroups, after, sorts, limit }: Args) => {
        const response = await axios.post(
            `/crm/v3/objects/${objectType}/search`,
            {
                properties,
                filterGroups,
                after,
                sorts,
                limit,
            }
        )
        return GeneralResponseValidator.parse(response.data).results
    }
})();

export const PropertyDefinitionValidator = z.object({
    name: z.string(),
    type: z.string(),
}).passthrough()

export const getObjectTypeProperties = (() => {

    interface Args {
        axios: AxiosInstance
        objectType: string
    }
    
    const ResponseValidator = z.object({
        results: z.array(PropertyDefinitionValidator)
    })

    return async ({ axios, objectType }: Args) => {
        const response = await axios.get(
            `/crm/v3/properties/${objectType}`,
        )
        return ResponseValidator.parse(response.data).results
    }
})();
