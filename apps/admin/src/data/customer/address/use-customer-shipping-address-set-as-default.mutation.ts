import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { API_ENDPOINTS } from '@utils/api/endpoints';

import ShippingAddress from '@repositories/shipping-address';

export interface ICustomerShippingAddressVariables {
  variables: {
    id?: string | null;
    shippingId?: string | null;
    input: any;
  };
}

export const useUpdateShippingAddressMutation = () => {
  const queryClient = useQueryClient();

  console.log();

  return useMutation(
    ({
      variables: { id, shippingId, input },
    }: ICustomerShippingAddressVariables) =>
      ShippingAddress.update(
        `${API_ENDPOINTS.CUSTOMERS}/${id}/${API_ENDPOINTS.CUSTOMERS_SHIPPING_ADDRESS}/${shippingId}/set-as-default`,
        input
      ),
    {
      onSuccess: () => {
        toast.success('Settled to default!');
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
