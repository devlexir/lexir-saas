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

  const url = `${API_ENDPOINTS.BRANDS_COMMISSION}?subdomain=${subdomain}`;

  const {
    data: { data, ...rest },
  } = await Brand.all(url);

  return { commission: { data, paginatorInfo: mapPaginatorData({ ...rest }) } };
};

const useBrandCommissionQuery = (options: BrandsQueryOptionsType) => {
  return useQuery<any, Error>([API_ENDPOINTS.BRANDS_COMMISSION, options], fetchBrands, {
    keepPreviousData: true,
  });
};

export { fetchBrands, useBrandCommissionQuery };
