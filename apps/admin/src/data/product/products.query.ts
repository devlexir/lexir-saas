import { useQuery } from 'react-query';

import { mapPaginatorData, stringifySearchQuery } from '@utils/data-mappers';

import Product from '@repositories/product';
import {
  ProductsQueryOptionsType,
  QueryParamsType,
} from '@ts-types/custom.types';


const fetchProducts = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;
  const {
    subdomain,
    page,
    text,
    type,
    category,
    shop_id,
    status,
    limit = 15,
    orderBy = 'updated_at',
    sortedBy = 'DESC',
  } = params as ProductsQueryOptionsType;

  const searchString = stringifySearchQuery({
    name: text,
    type,
    category,
    status,
    shop_id,
  });

  const url = `${process.env.NEXT_PUBLIC_NEW_REST_API_ENDPOINT}/products?subdomain=${subdomain}&with=shop;type&search=${searchString}&searchJoin=and&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;

  const {
    data: { data, ...rest },
  } = await Product.all(url);

  return { products: { data, paginatorInfo: mapPaginatorData({ ...rest }) } };
};

const useProductsQuery = (
  params: ProductsQueryOptionsType,
  options: any = {}
) => {
  return useQuery<any, Error>(
    [`${process.env.NEXT_PUBLIC_NEW_REST_API_ENDPOINT}/products`, params],
    fetchProducts,
    {
      ...options,
      keepPreviousData: true,
    }
  );
};

export { fetchProducts, useProductsQuery };
