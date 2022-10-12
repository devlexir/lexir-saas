
import Product from '@repositories/product';
import {
  ProductsQueryOptionsType,
  QueryParamsType,
} from '@ts-types/custom.types';

import { useQuery } from 'react-query';


const fetchProducts = async ({ queryKey }: QueryParamsType) => {  

  const [_key] = queryKey;

  const subdomain= "";

  const url = `${process.env.NEXT_PUBLIC_NEW_REST_API_ENDPOINT}/products?subdomain=${subdomain}`;

  const f = {
    subdomain:['baldoria', 'erika'],
    brands:['ssdf'], 
    price:{
      minPrice:0, maxPrice: 1000
    },
    orderBy: {
      name: 'ASC'
    }
  }

  const {
    data: { data, ...rest },
  } = await Product.all(url);

  return { products: { data } };
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
