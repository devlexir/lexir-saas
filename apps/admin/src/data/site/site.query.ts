import Product from "@repositories/product";
import { Product as TProduct } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useQuery } from "react-query";

export const fetchProduct = async (slug: string) => {
  const { data } = await Product.find(
    `${API_ENDPOINTS.PRODUCTS}/${slug}?with=digital_file;variation_options.digital_file`
  );
  return data;
};

export const useProductQuery = (slug: string) => {
  return useQuery<TProduct, Error>([API_ENDPOINTS.PRODUCTS, slug], () =>
    fetchProduct(slug)
  );
};
