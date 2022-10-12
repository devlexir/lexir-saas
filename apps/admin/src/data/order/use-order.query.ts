import { useQuery } from 'react-query';

import { API_ENDPOINTS } from '@utils/api/endpoints';

import Order from '@repositories/order';
import { Order as TOrder } from '@ts-types/generated';

export const fetchOrder = async (id: string, subdomain: string) => {
  const { data } = await Order.find(
    `${API_ENDPOINTS.ORDERS}/${id}?subdomain=${subdomain}`
  );
  return { order: data };
};

type OrderResponse = {
  order: TOrder;
};

export const useOrderQuery = (id: string, subdomain: string) => {
  return useQuery<OrderResponse, Error>([API_ENDPOINTS.ORDERS, id], () =>
    fetchOrder(id, subdomain)
  );
};
