import Settings from '@repositories/settings';

import { API_ENDPOINTS } from '@utils/api/endpoints';
import { mapPaginatorData } from '@utils/data-mappers';
import { useQuery } from 'react-query';

const fetch = async ({ queryKey }: any) => {
  const [_key] = queryKey;

  const url = `${API_ENDPOINTS.SETTINGS_BRANDS_SAAS_PLANS}`;

  const {
    data: { data, ...rest },
  } = await Settings.all(url);

  return { data: { data, paginatorInfo: mapPaginatorData({ ...rest }) } };
};

const useBrandsSaasPlansQuery = (options: any) => {
  return useQuery<any, Error>(
    [API_ENDPOINTS.SETTINGS_BRANDS_SAAS_PLANS, options],
    fetch,
    {
      keepPreviousData: true,
    }
  );
};

export { fetch, useBrandsSaasPlansQuery };
