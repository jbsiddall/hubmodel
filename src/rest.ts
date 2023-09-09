import { axios, AxiosInstance, z } from "./deps.ts";

export interface CreateHubspotAxiosConfig {
  accessToken: string;
}

export const createHubspotAxios = (config: CreateHubspotAxiosConfig) => {
  return axios.create({
    baseURL: "https://api.hubapi.com/",
    headers: {
      Authorization: `Bearer ${config.accessToken}`,
      "Content-Type": "application/json",
    },
  });
};

const GeneralResponseValidator = z.object({
  results: z.array(z.unknown()),
});

interface SearchObjectsArgs {
  axios: AxiosInstance;
  objectType: string;
  properties?: string[];
  filterGroups?: unknown[];
  after?: number;
  sorts?: string[];
  limit?: number;
}

export const searchObjects = async (
  { axios, objectType, properties, filterGroups, after, sorts, limit }:
    SearchObjectsArgs,
) => {
  const response = await axios.post(
    `/crm/v3/objects/${objectType}/search`,
    {
      properties,
      filterGroups,
      after,
      sorts,
      limit,
    },
  );
  return GeneralResponseValidator.parse(response.data).results;
};

export const PropertyDefinitionValidator = z.object({
  name: z.string(),
  type: z.string(),
}).passthrough();

interface GetObjectTypePropertiesArgs {
  axios: AxiosInstance;
  objectType: string;
}

const GetObjectTypePropertiesResponseValidator = z.object({
  results: z.array(PropertyDefinitionValidator),
});

export const getObjectTypeProperties = async (
  { axios, objectType }: GetObjectTypePropertiesArgs,
) => {
  const response = await axios.get(
    `/crm/v3/properties/${objectType}`,
  );
  return GetObjectTypePropertiesResponseValidator.parse(response.data).results;
};
