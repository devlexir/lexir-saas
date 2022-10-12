import Category from "@repositories/category";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useMutation, useQueryClient } from "react-query";

export const useDeleteCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => Category.delete(`${API_ENDPOINTS.CATEGORIES}/${id}`),
    {
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.CATEGORIES);
      },
    }
  );
};
