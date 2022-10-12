import Brand from "@repositories/brand";
import {
  BrandsQueryOptionsType,
  QueryParamsType,
} from "@ts-types/custom.types";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { mapPaginatorData } from "@utils/data-mappers";
import { useQuery } from "react-query";

const fetchProductsAbv = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;

  const { subdomain } = params as BrandsQueryOptionsType;

  const url = `${API_ENDPOINTS.PRODUCTS_ABV}?subdomain=${subdomain}`;

  const {
    data: { data, ...rest },
  } = await Brand.all(url);

  return { abv: { data, paginatorInfo: mapPaginatorData({ ...rest }) } };
};

const useProductAbvQuery = (options: BrandsQueryOptionsType) => {
  return useQuery<any, Error>([API_ENDPOINTS.PRODUCTS_ABV, options], fetchProductsAbv, {
    keepPreviousData: true,
  });
};

export { fetchProductsAbv, useProductAbvQuery };
