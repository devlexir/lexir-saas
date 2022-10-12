import Product from "@repositories/product";
import { Product as TProduct } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useQuery } from "react-query";

export const fetchProduct = async (productId: string) => {
  const { data } = await Product.find(
    `${API_ENDPOINTS.PRODUCTS}/${productId}`
  );
  return data;
};

export const useProductQuery = (productId: string) => {
  return useQuery<TProduct, Error>([API_ENDPOINTS.PRODUCTS, productId], () =>
    fetchProduct(productId)
  );
};
