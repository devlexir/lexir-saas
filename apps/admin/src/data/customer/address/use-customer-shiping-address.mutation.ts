import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { useRouter } from 'next/router';

import { API_ENDPOINTS } from '@utils/api/endpoints';

import ShippingAdrress from '@repositories/shipping-address';

export interface ICustomerShippingAddressVariables {
  variables: {
    id?: string | null;
    shippingId?: string | null;
    input: any;
  };
}

export const useUpdateShippingAddressMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({
      variables: { id, shippingId, input },
    }: ICustomerShippingAddressVariables) =>
      ShippingAdrress.update(
        `${API_ENDPOINTS.CUSTOMERS}/${id}/${API_ENDPOINTS.CUSTOMERS_SHIPPING_ADDRESS}/${shippingId}`,
        input
      ),
    {
      onSuccess: () => {
        toast.success('Customer Shipping Address Updated!');
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
