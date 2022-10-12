import { Shop } from '@framework/basic-rest/types';
import { API_ENDPOINTS } from '@framework/basic-rest/utils/api-endpoints';
import http from '@framework/basic-rest/utils/http';
import { useQuery } from 'react-query';

export const fetchShop = async (_slug: string) => {
  const { data } = await http.get(`${API_ENDPOINTS.SHOP}`);
  return data;
};
export const useShopQuery = (slug: string) => {
  return useQuery<Shop, Error>([API_ENDPOINTS.SHOP, slug], () =>
    fetchShop(slug)
  );
};
