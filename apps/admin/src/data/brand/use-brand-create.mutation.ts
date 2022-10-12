import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { useRouter } from 'next/router';

import { API_ENDPOINTS } from '@utils/api/endpoints';
import { ROUTES } from '@utils/routes';

import Brand from '@repositories/brand';
import { BrandInput } from '@ts-types/generated';

export interface IBrandVariables {
  variables: BrandInput;
}

export const useCreateBrandMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables }: IBrandVariables) =>
      Brand.create(API_ENDPOINTS.BRANDS, variables),
    {
      onSuccess: () => {
        toast.success('Brand Created!');
        router.push(ROUTES.BRANDS);
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
