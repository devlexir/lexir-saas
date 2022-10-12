import users from "@repositories/users";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => users.delete(`${API_ENDPOINTS.USERS}/${id}`),
    {
      onSuccess: () => {
        toast("Users Deleted!");
      },
      // Always refetch after error or success:
      onSettled: () => {
        return queryClient.invalidateQueries(API_ENDPOINTS.USERS);
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
