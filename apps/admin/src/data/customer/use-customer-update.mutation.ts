import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { useRouter } from 'next/router';

import { API_ENDPOINTS } from '@utils/api/endpoints';
import { ROUTES } from '@utils/routes';

import Customer from '@repositories/customer';
import { CustomerInput } from '@ts-types/generated';

export interface ICustomerVariables {
  variables: {
    id?: string | null;
    input: CustomerInput;
  };
}

export const useUpdateCustomerMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables: { id, input } }: ICustomerVariables) =>
      Customer.update(`${API_ENDPOINTS.CUSTOMERS}/${id}`, input),
    {
      onSuccess: () => {
        toast.success('Customer Updated');
        router.push(ROUTES.CUSTOMERS);
      },
      // Always refetch after error or success:
      onSettled: () => {
        return queryClient.invalidateQueries(API_ENDPOINTS.CUSTOMERS);
      },
      onError: (error) => {
        // @ts-ignore
        toast.error(`Something went wrong: ${error.message}`, {
          autoClose: 3000,
        });
      },
    }
  );
};
