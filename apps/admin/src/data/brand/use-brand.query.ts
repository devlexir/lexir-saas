import Brand from "@repositories/category";
import { BrandInput as TBrand } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useQuery } from "react-query";

export const fetchBrand = async (id: string) => {
  const { data } = await Brand.find(`${API_ENDPOINTS.BRANDS}/${id}`);
  return data;
};

export const useBrandQuery = (id: string) => {
  return useQuery<TBrand, Error>([API_ENDPOINTS.BRANDS, id], () =>
    fetchBrand(id)
  );
};
