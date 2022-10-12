import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import PasswordInput from '@components/ui/password-input';

import { allowedRoles, hasAccess, setAuthCredentials } from '@utils/auth-utils';
import { ROUTES } from '@utils/routes';

import { useLoginMutation } from '@data/user/use-login.mutation';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type FormValues = {
  email?: string;
  new_password: string;
  new_password_confirm: string;
};
const loginFormSchema = yup.object().shape({
  new_password: yup
    .string()
    .required()
    .label('New password')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    ),
  new_password_confirm: yup
    .string()
    .required()
    .label('Confirm the new password')
    .oneOf([yup.ref('new_password')], 'Passwords does not match'),
});

const defaultValues = {
  new_password_confirm: '',
  new_password: '',
};

const ChangePasswordFirstAccessForm = () => {
  const { mutate: login, isLoading: loading } = useLoginMutation();
  const [errorMsg, setErrorMsg] = useState('');
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(loginFormSchema),
  });
  const router = useRouter();

  function onSubmit({ email, new_password }: FormValues) {
    login(
      {
        variables: {
          email,
          new_password,
        },
      },
      {
        onSuccess: ({ data }) => {
          if (data?.token) {
            if (hasAccess(allowedRoles, data?.permissions)) {
              setAuthCredentials(data?.token, data?.permissions);
              router.push(ROUTES.DASHBOARD);
              return;
            }
            setErrorMsg('Not enough permission!');
          } else {
            setErrorMsg('Wrong credential!');
          }
        },
        onError: () => {},
      }
    );
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <PasswordInput
          label='New password'
          {...register('new_password')}
          variant='outline'
          className='mb-4'
          error={t(errors?.new_password?.message!)}
          placeholder='**********'
        />
        <PasswordInput
          label='Confirm the new password'
          {...register('new_password_confirm')}
          error={t(errors?.new_password_confirm?.message!)}
          variant='outline'
          className='mb-20 mt-8'
          forgotPageLink='/forgot-password'
          placeholder='**********'
        />
        <Button className='w-full' loading={loading} disabled={loading}>
          Login
        </Button>

        {errorMsg ? (
          <Alert
            message={t(errorMsg)}
            variant='error'
            closeable={true}
            className='mt-5'
            onClose={() => setErrorMsg('')}
          />
        ) : null}
      </form>
    </>
  );
};

export default ChangePasswordFirstAccessForm;
