import Product from "@repositories/product";
import {
  BrandsQueryOptionsType,
  QueryParamsType,
} from "@ts-types/custom.types";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { mapPaginatorData } from "@utils/data-mappers";
import { useQuery } from "react-query";

const fetchProductsSize = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;

  const { subdomain } = params as BrandsQueryOptionsType;

  const url = `${API_ENDPOINTS.PRODUCTS_SIZE}?subdomain=${subdomain}`;

  const {
    data: { data, ...rest },
  } = await Product.all(url);

  return { size: { data, paginatorInfo: mapPaginatorData({ ...rest }) } };
};

const useProductSizeQuery = (options: BrandsQueryOptionsType) => {
  return useQuery<any, Error>([API_ENDPOINTS.PRODUCTS_SIZE, options], fetchProductsSize, {
    keepPreviousData: true,
  });
};

export { fetchProductsSize, useProductSizeQuery };
