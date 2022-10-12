import User from "@repositories/user";
import { VerifyForgetPasswordTokenInput } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useMutation } from "react-query";

export interface IVerifyForgetPassVerifyToken {
  variables: { input: VerifyForgetPasswordTokenInput };
}
export const useVerifyForgetPasswordTokenMutation = () => {
  return useMutation(({ variables: { input } }: IVerifyForgetPassVerifyToken) =>
    User.forgetPassword(API_ENDPOINTS.VERIFY_FORGET_PASSWORD_TOKEN, input)
  );
};
