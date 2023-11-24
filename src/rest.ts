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
  filterGroups?: FilterGroup[] | undefined;
  after?: number | undefined;
  sorts?: string[];
  limit?: number | undefined;
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
  const filterGroupsRestParam = (filterGroups ?? []).flatMap((fg) => fg.filters.length === 0 ? [] : [fg]);

  const response = await axios.post(
    `/crm/v3/objects/${objectType}/search`,
    {
      properties,
      filterGroups: filterGroupsRestParam.length === 0 ? undefined : filterGroupsRestParam,
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
