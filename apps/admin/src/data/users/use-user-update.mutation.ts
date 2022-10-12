import users from "@repositories/users";
import { UpdateUsers } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

export interface IusersUpdateVariables {
  variables: {
    id?: string | null;
    input: UpdateUsers;
  };
}

export const useUpdateUsersMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables: { id, input } }: IusersUpdateVariables) =>
      users.update(`${API_ENDPOINTS.USERS}/${id}`, input),
    {
      onSuccess: () => {
        toast.success("User Updated");
        router.push(`${ROUTES.USERS}`);

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
