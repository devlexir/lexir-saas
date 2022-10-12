import AttributeValue from "@repositories/attribute";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useMutation, useQueryClient } from "react-query";

export const useDeleteAttributeValueMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) =>
      AttributeValue.delete(`${API_ENDPOINTS.ATTRIBUTE_VALUES}/${id}`),
    {
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.ATTRIBUTE_VALUES);
      },
    }
  );
};
