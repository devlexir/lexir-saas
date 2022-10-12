import payouts from '@repositories/payouts';
import {
  CustomersQueryOptionsType,
  QueryParamsType,
} from '@ts-types/custom.types';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import { mapPaginatorData } from '@utils/data-mappers';
import { useQuery } from 'react-query';

const fetchPayouts = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;

  const {
    subdomain,
  } = params as CustomersQueryOptionsType;

  const url = `${API_ENDPOINTS.PAYOUTS}?subdomain=${subdomain}`;

  const {
    data: { data, ...rest },
  } = await payouts.all(url);

  return { payouts: { data, paginatorInfo: mapPaginatorData({ ...rest }) } };
};

const usePayoutQuery = (options: CustomersQueryOptionsType) => {
  return useQuery<any, Error>([API_ENDPOINTS.PAYOUTS, options], fetchPayouts, {
    keepPreviousData: true,
  });
};

export { fetchPayouts, usePayoutQuery };
