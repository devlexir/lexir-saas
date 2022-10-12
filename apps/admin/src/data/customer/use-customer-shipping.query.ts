import { useQuery } from 'react-query';

import { API_ENDPOINTS } from '@utils/api/endpoints';

import ShippingAdrress from '@repositories/shipping-address';

const fetchUserShipping = async (customerId: string, addressId: string) => {
  const { data } = await ShippingAdrress.find(
    `${API_ENDPOINTS.CUSTOMERS}/${customerId}/${API_ENDPOINTS.CUSTOMERS_SHIPPING_ADDRESS}/${addressId}`
  );
  return data;
};

const useCustomerShippingAddressQuery = (
  customerId: string,
  addressId: string
) => {
  return useQuery<any, Error>(
    [
      API_ENDPOINTS.CUSTOMERS,
      customerId,
      API_ENDPOINTS.CUSTOMERS_SHIPPING_ADDRESS,
      addressId,
    ],
    () => fetchUserShipping(customerId, addressId)
  );
};

export { fetchUserShipping, useCustomerShippingAddressQuery };
