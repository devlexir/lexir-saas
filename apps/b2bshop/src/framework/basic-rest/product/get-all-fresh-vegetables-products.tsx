import { QueryOptionsType, Product } from '@framework/basic-rest/types';
import { API_ENDPOINTS } from '@framework/basic-rest/utils/api-endpoints';
import http from '@framework/basic-rest/utils/http';
import { useQuery } from 'react-query';

export const fetchFreshVegetablesProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.FRESH_VEGETABLES_PRODUCTS);
  return data as Product[];
};
export const useFreshVegetablesProductsQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>(
    [API_ENDPOINTS.FRESH_VEGETABLES_PRODUCTS, options],
    fetchFreshVegetablesProducts
  );
};
