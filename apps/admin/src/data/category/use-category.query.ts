import Category from "@repositories/category";
import { Category as TCategory } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useQuery } from "react-query";

export const fetchCategory = async (id: string) => {
  const { data } = await Category.find(`${API_ENDPOINTS.CATEGORIES}/${id}`);
  return data;
};

export const useCategoryQuery = (id: string) => {
  return useQuery<TCategory, Error>([API_ENDPOINTS.CATEGORIES, id], () =>
    fetchCategory(id)
  );
};
