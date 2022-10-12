import { ShopsQueryOptionsType, Shop } from '@framework/basic-rest/types';
import { API_ENDPOINTS } from '@framework/basic-rest/utils/api-endpoints';
import http from '@framework/basic-rest/utils/http';
import { useQuery } from 'react-query';

export const fetchShops = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.SHOPS);
  return { shop: { data } };
};

export const useShopsQuery = (options: ShopsQueryOptionsType) => {
  return useQuery<{ shop: { data: Shop[] } }, Error>(
    [API_ENDPOINTS.SHOPS, options],
    fetchShops
  );
};
