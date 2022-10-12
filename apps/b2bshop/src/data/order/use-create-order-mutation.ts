import Order from '@repositories/order';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import { useMutation } from 'react-query';

export interface IOrderCreateVariables {
  variables: { orderData: any };
}

export const useCreateOrderMutation = () => {

  return useMutation(
    ({ variables: { orderData } }: IOrderCreateVariables) =>
      Order.create(API_ENDPOINTS.ORDERS, orderData),
    {
      onSuccess: () => {

      },
      onError: (error) => {
      },
    }
  );
};
