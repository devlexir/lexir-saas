import Customer from "@repositories/customer";
import { CustomerInput } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

export interface ICustomerVariables {
  variables: CustomerInput;
}

export const useCreateCustomerMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables }: ICustomerVariables) =>
      Customer.create(API_ENDPOINTS.CUSTOMERS, variables),
    {
      onSuccess: () => {
        toast.success("Customer Created");
        router.push(ROUTES.CUSTOMERS);
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
