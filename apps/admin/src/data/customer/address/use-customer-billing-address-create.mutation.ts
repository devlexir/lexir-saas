import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { useRouter } from 'next/router';

import { API_ENDPOINTS } from '@utils/api/endpoints';

import BillingAddress from '@repositories/billing-address';
import { BillingAddressInput } from '@ts-types/generated';

export interface ICustomerBillingAddressVariables {
  variables: BillingAddressInput;
}

export const useCreateCustomerBillingAddressMutation = () => {
  const { query } = useRouter();

  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables }: ICustomerBillingAddressVariables) =>
      BillingAddress.create(
        `${API_ENDPOINTS.CUSTOMERS}/${query.customerId}/billing-address`,
        variables
      ),
    {
      onSuccess: () => {
        toast.success('Billing Address Created!');
        router.back();
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
