import { AxiosInstance, z } from "./deps.ts";

export interface CreateHubspotAxiosConfig {
  axios: AxiosInstance;
  accessToken: string;
}

export const configureAxios = (config: CreateHubspotAxiosConfig) => {
  config.axios.defaults.baseURL = "https://api.hubapi.com/";
  config.axios.defaults.headers.common = {
    Authorization: `Bearer ${config.accessToken}`,
    "Content-Type": "application/json",
  };
};

const GeneralResponseValidator = z.object({
  results: z.array(z.unknown()),
});

interface SearchObjectsArgs {
  axios: AxiosInstance;
  objectType: string;
  properties?: string[];
  filterGroups?: FilterGroup[];
  after?: number;
  sorts?: string[];
  limit?: number;
}

export interface FilterGroup {
  filters: Filter[];
}

export type Filter = { propertyName: string; operator: "EQ" | "NEQ"; value: string } | {
  propertyName: string;
  operator: "HAS_PROPERTY" | "NOT_HAS_PROPERTY";
};

export const searchObjects = async (
  { axios, objectType, properties, filterGroups, after, sorts, limit }: SearchObjectsArgs,
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
