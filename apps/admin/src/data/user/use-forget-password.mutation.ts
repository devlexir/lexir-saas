import User from "@repositories/user";
import { ForgetPasswordInput } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useMutation } from "react-query";

export interface IForgetPassVariables {
  variables: { input: ForgetPasswordInput };
}

export const useForgetPasswordMutation = () => {
  return useMutation(({ variables: { input } }: IForgetPassVariables) =>
    User.forgetPassword(API_ENDPOINTS.FORGET_PASSWORD, input)
  );
};
