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
    page,
    text,
    limit = 15,
    orderBy = 'updated_at',
    sortedBy = 'DESC',
  } = params as CustomersQueryOptionsType;

  const url = `${API_ENDPOINTS.CUSTOMERS}?subdomain=${subdomain}&search=${text}&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}&with=wallet`;

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
