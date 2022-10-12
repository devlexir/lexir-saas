import Customer from '@repositories/customer';
import {
  CustomersQueryOptionsType,
  QueryParamsType,
} from '@ts-types/custom.types';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import { mapPaginatorData } from '@utils/data-mappers';
import { useQuery } from 'react-query';

const fetchUsers = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;

  const {
    subdomain,
  } = params as CustomersQueryOptionsType;

  const url = `${API_ENDPOINTS.CUSTOMERS}?subdomain=${subdomain}`;

  const {
    data: { data, ...rest },
  } = await Customer.all(url);

  return { customers: { data, paginatorInfo: mapPaginatorData({ ...rest }) } };
};

const useCustomersQuery = (options: CustomersQueryOptionsType) => {
  return useQuery<any, Error>([API_ENDPOINTS.CUSTOMERS, options], fetchUsers, {
    keepPreviousData: true,
  });
};

export { fetchUsers, useCustomersQuery };
