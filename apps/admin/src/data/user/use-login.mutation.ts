import User from "@repositories/user";
import { LoginInput } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useMutation } from "react-query";

export interface ILoginVariables {
  variables: LoginInput;
}

export const useLoginMutation = () => {
  return useMutation(({ variables }: ILoginVariables) =>
    User.login(API_ENDPOINTS.TOKEN, variables)
  );
};
