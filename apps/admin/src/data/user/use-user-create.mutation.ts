import User from "@repositories/user";
import { RegisterInput } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";

export interface IRegisterVariables {
  variables: RegisterInput;
}

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables }: IRegisterVariables) =>
      User.register(API_ENDPOINTS.REGISTER, variables),
    {
      onSuccess: () => {
        router.push(ROUTES.USERS);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.USERS);
      },
    }
  );
};
