import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { useRouter } from 'next/router';

import { API_ENDPOINTS } from '@utils/api/endpoints';
import { ROUTES } from '@utils/routes';

import Order from '@repositories/order';
import { CreateOrder } from '@ts-types/generated';

export interface IOrderCreateVariables {
  variables: { id: string; orderData: CreateOrder };
}

export const useCreateOrderMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables: { orderData } }: IOrderCreateVariables) =>
      Order.create(API_ENDPOINTS.ORDERS, orderData),
    {
      onSuccess: () => {
        toast.success('Order Created');
        router.push(ROUTES.ORDERS);
      },
      // Always refetch after error or success:
      onSettled: () => {
        return queryClient.invalidateQueries(API_ENDPOINTS.CUSTOMERS);
      },
      onError: (error) => {
        console.log(error);
        // @ts-ignore
        toast.error(`Something went wrong: ${error.message}`, {
          autoClose: 3000,
        });
      },
    }
  );
};
