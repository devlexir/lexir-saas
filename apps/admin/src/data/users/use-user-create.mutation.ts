import users from "@repositories/users";
import { UserInput } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

export interface IUsersVariables {
  variables: UserInput;
}

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables }: IUsersVariables) =>
      users.create(API_ENDPOINTS.USERS, variables),
    {
      onSuccess: () => {
        toast.success("Users Created!");
        router.push(ROUTES.USERS);
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
