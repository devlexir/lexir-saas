import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { useRouter } from 'next/router';

import { API_ENDPOINTS } from '@utils/api/endpoints';

import BillingAddress from '@repositories/billing-address';

export interface ICustomerBillingAddressVariables {
  variables: {
    id?: string | null;
    billingId?: string | null;
    input: any;
  };
}

export const useUpdateBillingAddressMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({
      variables: { id, billingId, input },
    }: ICustomerBillingAddressVariables) =>
      BillingAddress.update(
        `${API_ENDPOINTS.CUSTOMERS}/${id}/${API_ENDPOINTS.CUSTOMERS_BILLING_ADDRESS}/${billingId}`,
        input
      ),
    {
      onSuccess: () => {
        toast.success('Customer Billing Address Updated!');
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
