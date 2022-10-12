import { QueryOptionsType, Product } from '@framework/basic-rest/types';
import { API_ENDPOINTS } from '@framework/basic-rest/utils/api-endpoints';
import http from '@framework/basic-rest/utils/http';
import { useQuery } from 'react-query';

export const fetchFlashSellProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.FLASH_SELL_PRODUCTS);
  return data as Product[];
};
export const useFlashSellProductsQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>(
    [API_ENDPOINTS.FLASH_SELL_PRODUCTS, options],
    fetchFlashSellProducts
  );
};
