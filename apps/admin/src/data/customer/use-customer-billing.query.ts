import { useQuery } from 'react-query';

import { API_ENDPOINTS } from '@utils/api/endpoints';

import BillingAddress from '@repositories/billing-address';

const fetchUserBilling = async (customerId: string, addressId: string) => {
  const { data } = await BillingAddress.find(
    `${API_ENDPOINTS.CUSTOMERS}/${customerId}/${API_ENDPOINTS.CUSTOMERS_BILLING_ADDRESS}/${addressId}`
  );
  return data;
};

const useCustomerBillingAddressQuery = (
  customerId: string,
  addressId: string
) => {
  return useQuery<any, Error>(
    [
      API_ENDPOINTS.CUSTOMERS,
      customerId,
      API_ENDPOINTS.CUSTOMERS_BILLING_ADDRESS,
      addressId,
    ],
    () => fetchUserBilling(customerId, addressId)
  );
};

export { fetchUserBilling, useCustomerBillingAddressQuery };
