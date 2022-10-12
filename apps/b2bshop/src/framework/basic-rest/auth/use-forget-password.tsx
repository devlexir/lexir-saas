import Cookies from 'js-cookie';
import { useMutation } from 'react-query';

export interface ForgetPasswordType {
  email: string;
}
async function forgetPassword(input: ForgetPasswordType) {
  return {
    ok: true,
    message: 'Forget password Successful!',
  };
}
export const useForgetPasswordMutation = () => {
  return useMutation((input: ForgetPasswordType) => forgetPassword(input), {
    onSuccess: (_data) => {
      Cookies.remove('auth_token');
    },
    onError: () => {},
  });
};
