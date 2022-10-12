import Type from "@repositories/type";
import { Type as TType } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useQuery } from "react-query";

export const fetchType = async (slug: string) => {
  const { data } = await Type.find(`${API_ENDPOINTS.TYPES}/${slug}`);
  return data;
};

export const useTypeQuery = (slug: string) => {
  return useQuery<TType, Error>([API_ENDPOINTS.TYPES, slug], () =>
    fetchType(slug)
  );
};
