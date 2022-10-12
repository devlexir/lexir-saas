import { useUI } from '@contexts/ui.context';
import Cookies from 'js-cookie';
import { useMutation } from 'react-query';

export interface SignUpInputType {
  email: string;
  password: string;
  name: string;
  confirm_password: string;
  remember_me: boolean;
  legal_age: boolean;
  terms_of_service: boolean;
}
async function signUp(input: SignUpInputType) {
  return {
    token: `${input.email}.${input.name}`.split('').reverse().join(''),
  };
}
export const useSignUpMutation = () => {
  const { authorize, closeModal } = useUI();
  return useMutation((input: SignUpInputType) => signUp(input), {
    onSuccess: (data) => {
      Cookies.set('auth_token', data.token);
      authorize();
      closeModal();
    },
    onError: () => {},
  });
};
