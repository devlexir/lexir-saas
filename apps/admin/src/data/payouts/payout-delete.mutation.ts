import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { API_ENDPOINTS } from '@utils/api/endpoints';

import Payout from '@repositories/payouts';

export const useDeletePayoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => Payout.delete(`${API_ENDPOINTS.PAYOUTS}/${id}`),
    {
      onSuccess: () => {
        toast('Payout Deleted!');
      },
      // Always refetch after error or success:
      onSettled: () => {
        return queryClient.invalidateQueries(API_ENDPOINTS.PAYOUTS);
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
