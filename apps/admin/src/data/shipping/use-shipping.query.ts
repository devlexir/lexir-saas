import Shipping from "@repositories/shipping";
import { Shipping as TShipping } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useQuery } from "react-query";

export const fetchShipping = async (id: string) => {
  const { data } = await Shipping.find(`${API_ENDPOINTS.SHIPPINGS}/${id}`);
  return data;
};

export const useShippingQuery = (id: string) => {
  return useQuery<TShipping, Error>([API_ENDPOINTS.SHIPPINGS, id], () =>
    fetchShipping(id)
  );
};
