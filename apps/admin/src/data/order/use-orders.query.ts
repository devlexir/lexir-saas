import { useQuery } from 'react-query';

import { API_ENDPOINTS } from '@utils/api/endpoints';
import { mapPaginatorData, stringifySearchQuery } from '@utils/data-mappers';

import Orders from '@repositories/type';
import { QueryOptionsType, QueryParamsType } from '@ts-types/custom.types';

const fetchOrders = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;
  const {
    subdomain,
    text,
    shop_id,
    page = 1,
    limit = 20,
    orderBy = 'updated_at',
    sortedBy = 'DESC',
    orderIdFilterOrder,
    customerFilterOrder,
    customerTypeFilterOrder,
    orderValueMinFilterOrder,
    orderValueMaxFilterOrder,
    startDate = '2000-01-01',
    endDate = '2100-01-01',
  } = params as QueryOptionsType;

  const searchString = stringifySearchQuery({
    tracking_number: text,
  });

  const url = `${API_ENDPOINTS.ORDERS}?subdomain=${subdomain}&startdate=${startDate}&enddate=${endDate}&orderIdFilterOrder=${orderIdFilterOrder}&customerFilterOrder=${customerFilterOrder}&customerTypeFilterOrder=${customerTypeFilterOrder}&orderValueMinFilterOrder=${orderValueMinFilterOrder}&orderValueMaxFilterOrder=${orderValueMaxFilterOrder}&search=${searchString}&shop_id=${shop_id}&page=${page}&limit=${limit}&orderBy=${orderBy}&sortedBy=${sortedBy}`;

  const {
    data: { data, ...rest },
  } = await Orders.all(url);
  return { orders: { data, paginatorInfo: mapPaginatorData({ ...rest }) } };
};

const useOrdersQuery = (params: QueryOptionsType = {}, options: any = {}) => {
  return useQuery<any, Error>([API_ENDPOINTS.ORDERS, params], fetchOrders, {
    ...options,
    keepPreviousData: true,
  });
};

export { fetchOrders, useOrdersQuery };
