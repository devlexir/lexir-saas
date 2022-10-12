import Product from "@repositories/product";
import { QueryParamsType } from "@ts-types/custom.types";
import { Product as TProduct } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { stringifySearchQuery } from "@utils/data-mappers";
import { useQuery } from "react-query";

const fetchPopularProducts = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;
  const { limit = 15, shop_id } = params as { limit: number; shop_id: number };
  const searchString = stringifySearchQuery({
    shop_id,
  });
  const url = `${API_ENDPOINTS.POPULAR_PRODUCTS}?search=${searchString}&limit=${limit}`;
  const { data } = await Product.popularProducts(url);
  return data;
};

const usePopularProductsQuery = (options: {
  limit: number;
  shop_id?: number;
}) => {
  return useQuery<TProduct[], Error>(
    [API_ENDPOINTS.POPULAR_PRODUCTS, options],
    fetchPopularProducts
  );
};

export { fetchPopularProducts,usePopularProductsQuery };
