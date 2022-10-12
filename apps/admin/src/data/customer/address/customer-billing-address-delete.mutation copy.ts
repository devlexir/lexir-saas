import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { useRouter } from 'next/router';

import { API_ENDPOINTS } from '@utils/api/endpoints';

import BillingAddress from '@repositories/billing-address';

export const useDeleteBillingAddressMutation = () => {
  const queryClient = useQueryClient();
  const { query } = useRouter();

  return useMutation(
    (id: any) =>
      BillingAddress.delete(
        `${API_ENDPOINTS.CUSTOMERS}/${query.customerId}/${API_ENDPOINTS.CUSTOMERS_BILLING_ADDRESS}/${id}`
      ),
    {
      onSuccess: () => {
        toast('Billing Address Deleted!');
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
