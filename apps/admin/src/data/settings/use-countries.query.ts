import Settings from '@repositories/settings';

import { API_ENDPOINTS } from '@utils/api/endpoints';
import { mapPaginatorData } from '@utils/data-mappers';
import { useQuery } from 'react-query';

const fetch = async ({ queryKey }: any) => {
  const [_key] = queryKey;

  const url = `${API_ENDPOINTS.SETTINGS_COUNTRIES}`;

  const {
    data: { data, ...rest },
  } = await Settings.all(url);

  return { data: { data, paginatorInfo: mapPaginatorData({ ...rest }) } };
};

const useCountriesQuery = (options: any) => {
  return useQuery<any, Error>(
    [API_ENDPOINTS.SETTINGS_COUNTRIES, options],
    fetch,
    {
      keepPreviousData: true,
    }
  );
};

export { fetch, useCountriesQuery };
