import OrderStatus from "@repositories/order-status";
import { OrderStatus as TOrderStatus } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useQuery } from "react-query";

export const fetchOrderStatus = async (slug: string) => {
  const { data } = await OrderStatus.find(
    `${API_ENDPOINTS.ORDER_STATUS}/${slug}`
  );
  return data;
};

export const useOrderStatusQuery = (identifier: string) => {
  return useQuery<TOrderStatus, Error>(
    [API_ENDPOINTS.ORDER_STATUS, identifier],
    () => fetchOrderStatus(identifier)
  );
};
