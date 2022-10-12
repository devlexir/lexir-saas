import Brand from "@repositories/brand";
import {
  BrandsQueryOptionsType,
  QueryParamsType,
} from "@ts-types/custom.types";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { mapPaginatorData } from "@utils/data-mappers";
import { useQuery } from "react-query";

const fetchBrands = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;

  const { subdomain } = params as BrandsQueryOptionsType;

  const url = `${API_ENDPOINTS.BRANDS}?subdomain=${subdomain}`;

  const {
    data: { data, ...rest },
  } = await Brand.all(url);

  return { brands: { data, paginatorInfo: mapPaginatorData({ ...rest }) } };
};

const useProductBrandsQuery = (options: BrandsQueryOptionsType) => {
  return useQuery<any, Error>([API_ENDPOINTS.BRANDS, options], fetchBrands, {
    keepPreviousData: true,
  });
};

export { fetchBrands,useProductBrandsQuery };
