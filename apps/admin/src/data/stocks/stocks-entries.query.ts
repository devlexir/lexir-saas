import { useQuery } from 'react-query';

import stock from '@repositories/stock';
import {
  StocksQueryOptionsType,
  QueryParamsType,
} from '@ts-types/custom.types';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import { mapPaginatorData } from '@utils/data-mappers';

const fetchStocks = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;

  const { subdomain } = params as StocksQueryOptionsType;

  const url = `${API_ENDPOINTS.STOCKS_INFO}?subdomain=${subdomain}`;

  const {
    data: { data, ...rest },
  } = await stock.all(url);

  return { stocks: { data, paginatorInfo: mapPaginatorData({ ...rest }) } };
};

const useStocksEntriesQuery = (options: StocksQueryOptionsType) => {
  return useQuery<any, Error>(
    [API_ENDPOINTS.STOCKS_INFO, options],
    fetchStocks,
    {
      ...options,
      keepPreviousData: true,
    }
  );
};

export { fetchStocks, useStocksEntriesQuery };
