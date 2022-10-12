import { useMutation } from 'react-query';

export interface ChangePasswordInputType {
  newPassword: string;
  oldPassword: string;
  newPasswordConfirm?: string;
}
async function changePassword(input: ChangePasswordInputType) {
  return input;
}
export const useChangePasswordMutation = () => {
  return useMutation(
    (input: ChangePasswordInputType) => changePassword(input),
    {
      onSuccess: () => {},
      onError: () => {},
    }
  );
};
