import User from "@repositories/user";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useMutation, useQueryClient } from "react-query";

export const useUnblockUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: number) => User.unblock(API_ENDPOINTS.UNBLOCK_USER, { id }),
    {
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.USERS);
        queryClient.invalidateQueries(API_ENDPOINTS.STAFFS);
      },
    }
  );
};
