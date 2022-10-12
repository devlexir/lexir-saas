import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { API_ENDPOINTS } from '@utils/api/endpoints';

import Order from '@repositories/order';

export interface IOrderUpdateVariables {
  variables: { id: string; changeStatusId: any };
}

export const useUpdateOrderChangeStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ variables: { id, changeStatusId } }: IOrderUpdateVariables) =>
      Order.update(
        `${API_ENDPOINTS.ORDERS}/${id}/${API_ENDPOINTS.CHANGE_STATUS}?status=${changeStatusId}`,
        changeStatusId
      ),
    {
      onSuccess: () => {
        toast.success('Status changed with success');
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
