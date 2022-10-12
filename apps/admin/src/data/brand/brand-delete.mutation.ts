import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { API_ENDPOINTS } from '@utils/api/endpoints';

import Brand from '@repositories/brand';

export const useDeleteBrandMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => Brand.delete(`${API_ENDPOINTS.BRANDS}/${id}`),
    {
      onSuccess: () => {
        toast('Brand Deleted!');
      },
      // Always refetch after error or success:
      onSettled: () => {
        return queryClient.invalidateQueries(API_ENDPOINTS.BRANDS);
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
