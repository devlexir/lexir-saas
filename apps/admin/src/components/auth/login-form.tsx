import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import Input from '@components/ui/input';
import PasswordInput from '@components/ui/password-input';

import { allowedRoles, hasAccess, setAuthCredentials } from '@utils/auth-utils';
import { setSubdomain } from '@utils/request-utils';
import { getSubdomain } from '@utils/request-utils';
import { ROUTES } from '@utils/routes';

import { useLoginMutation } from '@data/user/use-login.mutation';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type FormValues = {
  email: string;
  password: string;
};

const loginFormSchema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password is required'),
});

const defaultValues = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const router = useRouter();

  const { subdomain: subdomain } = getSubdomain();

  const { site } = router.query;
  //@ts-ignore
  setSubdomain(site);

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

  function onSubmit({ email, password }: FormValues) {
    login(
      {
        variables: {
          email,
          password,
          subdomain,
        },
      },
      {
        onSuccess: ({ data }) => {
          console.log(data);
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
        <Input
          label='Email'
          {...register('email')}
          type='email'
          variant='outline'
          className='mb-4'
          error={t(errors?.email?.message!)}
          placeholder='example@example.com'
        />
        <PasswordInput
          label='Password'
          {...register('password')}
          error={t(errors?.password?.message!)}
          variant='outline'
          className='mb-9 mt-8'
          forgotPageLink='/forgot-password'
          placeholder='**********'
        />
        <Button
          variant='normal'
          className='w-full'
          loading={loading}
          disabled={loading}
        >
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

export default LoginForm;
