import Customer from "@repositories/customer";
import { CustomerInput } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useMutation, useQueryClient } from "react-query";

export interface ICustomerVariables {
  variables: CustomerInput;
}

export const useCustomerAddBillingAddressMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ variables }: ICustomerVariables) =>
      Customer.create(API_ENDPOINTS.CUSTOMERS_BILLING_ADDRESS, variables),
    {
      onSuccess: () => {
        console.log("ok");
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.CUSTOMERS_BILLING_ADDRESS);
      },
      onError: (e) => {
        console.log(e);
      },
    }
  );
};
