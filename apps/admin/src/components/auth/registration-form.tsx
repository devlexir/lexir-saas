import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import Checkbox from '@components/ui/checkbox/checkbox';
import Input from '@components/ui/input';
import Link from '@components/ui/link';
import PasswordInput from '@components/ui/password-input';

import { allowedRoles, hasAccess, setAuthCredentials } from '@utils/auth-utils';
import { ROUTES } from '@utils/routes';

import { useRegisterMutation } from '@data/user/use-register.mutation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Permission } from '@ts-types/generated';
import * as yup from 'yup';

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  privacy_policy: any;
  permission: Permission;
};
const registrationFormSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .email('form:error-email-format')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .label('Password')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    ),
  confirm_password: yup
    .string()
    .required('Confirm the Password is required')
    .label('Confirm the password')
    .oneOf([yup.ref('password')], 'Passwords does not match'),
  permission: yup.string().default('store_owner').oneOf(['store_owner']),
});
const RegistrationForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate: registerUser, isLoading: loading } = useRegisterMutation();

  const privacyPolicy = (
    <span>
      I agree with the{' '}
      <Link href='/'>
        <a className='font-semibold text-[#1C8C64]'>Terms of Service</a>
      </Link>{' '}
      and{' '}
      <Link href='/'>
        <a className='font-semibold text-[#1C8C64]'>Privacy Policy</a>
      </Link>
    </span>
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>({
    resolver: yupResolver(registrationFormSchema),
    defaultValues: {
      permission: Permission.StoreOwner,
    },
  });
  const router = useRouter();
  const { t } = useTranslation();

  async function onSubmit({ name, email, password, permission }: FormValues) {
    registerUser(
      {
        variables: {
          name,
          email,
          password,
          permission,
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
            setErrorMessage('form:error-enough-permission');
          } else {
            setErrorMessage('form:error-credential-wrong');
          }
        },
        onError: (error: any) => {
          Object.keys(error?.response?.data).forEach((field: any) => {
            setError(field, {
              type: 'manual',
              message: error?.response?.data[field],
            });
          });
        },
      }
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          label='Name'
          {...register('name')}
          variant='outline'
          className='mb-6'
          error={t(errors?.name?.message!)}
          placeholder='Martin'
        />
        <Input
          label='Email'
          {...register('email')}
          type='email'
          variant='outline'
          className='mb-6'
          error={t(errors?.email?.message!)}
          placeholder='example@example.com'
        />
        <PasswordInput
          label='Password'
          {...register('password')}
          error={t(errors?.password?.message!)}
          variant='outline'
          className='mb-6'
          forgotPageLink='/forgot-password'
          placeholder='**********'
        />
        <PasswordInput
          label='Confirm Password'
          {...register('confirm_password')}
          error={t(errors?.confirm_password?.message!)}
          variant='outline'
          className='mb-4'
          forgotPageLink='/forgot-password'
          placeholder='**********'
        />

        <Checkbox
          {...register('privacy_policy')}
          error={t(errors?.privacy_policy?.message!)}
          label={privacyPolicy}
          className='mb-8'
        />
        <Button className='w-full' loading={loading} disabled={loading}>
          SIGN UP
        </Button>

        {errorMessage ? (
          <Alert
            message={t(errorMessage)}
            variant='error'
            closeable={true}
            className='mt-5'
            onClose={() => setErrorMessage(null)}
          />
        ) : null}
      </form>

      <div className='mt-4 text-sm text-body'>
        {'Already have an account?'}{' '}
        <Link
          href={ROUTES.LOGIN}
          className='font-semibold text-accent transition-colors duration-200 ms-1 hover:text-accent-hover hover:no-underline focus:text-accent-700 focus:no-underline focus:outline-none'
        >
          Login
        </Link>
      </div>
    </>
  );
};

export default RegistrationForm;
