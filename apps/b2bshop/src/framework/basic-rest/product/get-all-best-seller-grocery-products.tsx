import { QueryOptionsType, Product } from '@framework/basic-rest/types';
import { API_ENDPOINTS } from '@framework/basic-rest/utils/api-endpoints';
import http from '@framework/basic-rest/utils/http';
import { useQuery } from 'react-query';

export const fetchBestSellerGroceryProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.BEST_SELLER_GROCERY_PRODUCTS);
  return data as Product[];
};
export const useBestSellerGroceryProductsQuery = (
  options: QueryOptionsType
) => {
  return useQuery<Product[], Error>(
    [API_ENDPOINTS.BEST_SELLER_GROCERY_PRODUCTS, options],
    fetchBestSellerGroceryProducts
  );
};
