import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { useRouter } from 'next/router';

import { API_ENDPOINTS } from '@utils/api/endpoints';
import { ROUTES } from '@utils/routes';

import Brand from '@repositories/brand';
import { UpdateBrand } from '@ts-types/generated';

export interface IBrandUpdateVariables {
  variables: {
    id?: string | null;
    input: UpdateBrand;
  };
}

export const useUpdateBrandMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables: { id, input } }: IBrandUpdateVariables) =>
      Brand.update(`${API_ENDPOINTS.BRANDS}/${id}`, input),
    {
      onSuccess: () => {
        toast.success('Brand Updated');
        router.push(`${ROUTES.BRANDS}`);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.BRANDS);
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
