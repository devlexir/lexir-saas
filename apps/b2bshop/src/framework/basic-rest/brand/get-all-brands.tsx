import { QueryOptionsType, Brand } from '@framework/basic-rest/types';
import { API_ENDPOINTS } from '@framework/basic-rest/utils/api-endpoints';
import http from '@framework/basic-rest/utils/http';
import { useQuery } from 'react-query';

export const fetchBrands = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const {
    data: { data },
  } = await http.get(API_ENDPOINTS.BRANDS);
  return { brands: { data: data as Brand[] } };
};
export const useBrandsQuery = (options: QueryOptionsType) => {
  return useQuery<{ brands: { data: Brand[] } }, Error>(
    [API_ENDPOINTS.BRANDS, options],
    fetchBrands
  );
};
