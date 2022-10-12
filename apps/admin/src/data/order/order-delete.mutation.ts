import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { API_ENDPOINTS } from '@utils/api/endpoints';

import Order from '@repositories/order';

export const useDeleteOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => Order.delete(`${API_ENDPOINTS.ORDERS}/${id}`),
    {
      onSuccess: () => {
        toast('Order Deleted!');
      },
      // Always refetch after error or success:
      onSettled: () => {
        return queryClient.invalidateQueries(API_ENDPOINTS.ORDERS);
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
