import Customer from "@repositories/customer";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

export const useDeleteCustomerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => Customer.delete(`${API_ENDPOINTS.CUSTOMERS}/${id}`),
    {
      onSuccess: () => {
        toast("Customer Deleted!");
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
