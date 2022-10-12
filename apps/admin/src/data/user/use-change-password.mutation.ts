import User from "@repositories/user";
import { ChangePasswordInput } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useMutation } from "react-query";

export interface IChangePassVariables {
  variables: { input: ChangePasswordInput };
}

export const useChangePasswordMutation = () => {
  return useMutation(({ variables: { input } }: IChangePassVariables) =>
    User.changePassword(API_ENDPOINTS.CHANGE_PASSWORD, input)
  );
};
