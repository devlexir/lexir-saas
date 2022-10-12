import Site from "@repositories/site";
import {
  ProductsQueryOptionsType,
  QueryParamsType,
} from "@ts-types/custom.types";
import { mapPaginatorData } from "@utils/data-mappers";
import { useQuery } from "react-query";

const fetchSites = async ({ queryKey }: QueryParamsType) => {
  const [_key] = queryKey;

  const url = `${process.env.NEXT_PUBLIC_NEW_REST_API_ENDPOINT}/sites`;

  const {
    data: { data, ...rest },
  } = await Site.all(url);

  return { products: { data, paginatorInfo: mapPaginatorData({ ...rest }) } };
};

const useSitesQuery = (params: ProductsQueryOptionsType, options: any = {}) => {
  return useQuery<any, Error>(
    [`${process.env.NEXT_PUBLIC_NEW_REST_API_ENDPOINT}/sites`, params],
    fetchSites,
    {
      ...options,
      keepPreviousData: true,
    }
  );
};

export { fetchSites,useSitesQuery };
