import Settings from '@repositories/settings';

import { API_ENDPOINTS } from '@utils/api/endpoints';
import { mapPaginatorData } from '@utils/data-mappers';
import { useQuery } from 'react-query';

const fetch = async ({ queryKey }: any) => {
  const [_key] = queryKey;

  const url = `${API_ENDPOINTS.SETTINGS_BRANDS_TYPES_RELATIONSHIP}`;

  const {
    data: { data, ...rest },
  } = await Settings.all(url);

  return { data: { data, paginatorInfo: mapPaginatorData({ ...rest }) } };
};

const useBrandsTypesRelationshipQuery = (options: any) => {
  return useQuery<any, Error>(
    [API_ENDPOINTS.SETTINGS_BRANDS_TYPES_RELATIONSHIP, options],
    fetch,
    {
      keepPreviousData: true,
    }
  );
};

export { fetch, useBrandsTypesRelationshipQuery };
