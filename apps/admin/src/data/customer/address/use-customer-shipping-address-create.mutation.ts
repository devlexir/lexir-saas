import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { useRouter } from 'next/router';

import { API_ENDPOINTS } from '@utils/api/endpoints';

import ShippingAdrress from '@repositories/shipping-address';
import { ShippingAddressInput } from '@ts-types/generated';

export interface ICustomerShippingAddressVariables {
  variables: ShippingAddressInput;
}

export const useCreateCustomerShippingAddressMutation = () => {
  const { query } = useRouter();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables }: ICustomerShippingAddressVariables) =>
      ShippingAdrress.create(
        `${API_ENDPOINTS.CUSTOMERS}/${query.customerId}/shipping-address`,
        variables
      ),
    {
      onSuccess: () => {
        toast.success('Shipping Address Created!');
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
