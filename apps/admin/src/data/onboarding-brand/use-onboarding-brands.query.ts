import Brand from "@repositories/brand";
import {
  BrandsQueryOptionsType,
  QueryParamsType,
} from "@ts-types/custom.types";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { mapPaginatorData } from "@utils/data-mappers";
import { useQuery } from "react-query";

const fetchOnboardingBrands = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;

  const { subdomain } = params as BrandsQueryOptionsType;

  const url = `${API_ENDPOINTS.ONBOARDING_BRANDS}?subdomain=${subdomain}`;

  const {
    data: { data, ...rest },
  } = await Brand.all(url);

  return { brands: { data, paginatorInfo: mapPaginatorData({ ...rest }) } };
};

const useOnboardingBrandsQuery = (options: BrandsQueryOptionsType) => {
  return useQuery<any, Error>([API_ENDPOINTS.ONBOARDING_BRANDS, options], fetchOnboardingBrands, {
    keepPreviousData: true,
  });
};

export { fetchOnboardingBrands,useOnboardingBrandsQuery };
