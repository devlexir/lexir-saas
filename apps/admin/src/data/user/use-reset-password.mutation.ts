import User from "@repositories/user";
import { ResetPasswordInput } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useMutation } from "react-query";

export interface IResetPassword {
  variables: { input: ResetPasswordInput };
}

export const useResetPasswordMutation = () => {
  return useMutation(({ variables: { input } }: IResetPassword) =>
    User.forgetPassword(API_ENDPOINTS.FORGET_PASSWORD, input)
  );
};
