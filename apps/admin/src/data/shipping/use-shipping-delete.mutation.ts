import Shipping from "@repositories/product";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useMutation, useQueryClient } from "react-query";

export const useDeleteShippingClassMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => Shipping.delete(`${API_ENDPOINTS.SHIPPINGS}/${id}`),
    {
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.SHIPPINGS);
      },
    }
  );
};
