import { useModalAction } from '@components/common/modal/modal.context';
import Button from '@components/ui/button';
import CloseButton from '@components/ui/close-button';
import Input from '@components/ui/form/input';
import PasswordInput from '@components/ui/form/password-input';
import Image from '@components/ui/image';
import Logo from '@components/ui/logo';
import Switch from '@components/ui/switch';
import {
  useLoginMutation,
  LoginInputType,
} from '@framework/basic-rest/auth/use-login';
import { ROUTES } from '@utils/routes';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface LoginFormProps {
  isPopup?: boolean;
  className?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ isPopup = true, className }) => {
  const { closeModal, openModal } = useModalAction();
  const { mutate: login, isLoading } = useLoginMutation();
  const [remember, setRemember] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginInputType>({ mode: 'onChange' });

  function onSubmit({ email, password, remember_me }: LoginInputType) {
    login({
      email,
      password,
      remember_me,
    });
    closeModal();
  }
  function handleSignUp() {
    return openModal('SIGN_UP_VIEW');
  }
  function handleForgetPassword() {
    return openModal('FORGET_PASSWORD');
  }
  function handlePrivacyPolicy() {
    router.push(ROUTES.PRIVACY);
    closeModal();
  }
  return (
    <div className='rounded relative w-full md:w-[720px] lg:w-[920px] xl:w-[1000px] 2xl:w-[1200px]'>
      <CloseButton onClick={closeModal} />
      <div className='mx-auto flex overflow-hidden rounded-lg bg-brand-light'>
        <div className='registration relative hidden md:block md:w-1/2 lg:w-[55%] xl:w-[60%]'>
          <Image
            src='/assets/images/login.jpeg'
            alt='signin Image'
            layout='fill'
          />
        </div>
        <div className='flex w-full flex-col justify-center rounded-md py-6 px-4 sm:py-10 sm:px-8 md:w-1/2 md:px-6 lg:w-[45%] lg:px-10 xl:w-[40%]'>
          <div className='text-center'>
            <div onClick={closeModal}>
              <Logo />
            </div>
            <h4 className='mt-4 text-xl font-bold uppercase text-brand-dark sm:text-[22px] sm:leading-8'>
              {'Welcome Back!'}
            </h4>
            <div className='mt-4 text-center text-base text-black	'>
              {'Don’t have an account?'}
              <button
                type='button'
                className='text-base text-brand hover:no-underline focus:outline-none ltr:ml-1 rtl:mr-1 '
                onClick={handleSignUp}
              >
                {'Create Account'}
              </button>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col justify-center pt-10'
            noValidate
          >
            <div className='flex flex-col'>
              <Input
                label={'Email'}
                placeholder='Enter your email'
                type='email'
                variant='solid'
                className='text-brand-mutedThree text-base'
                {...register('email', {
                  required: {
                    value: true,
                    message: 'You need to fill with the email',
                  },
                })}
                error={errors.email?.message}
              />
              <div className='pt-5'>
                <PasswordInput
                  label={'Password'}
                  placeholder='Enter your password'
                  {...register('password', {
                    required: {
                      value: true,
                      message: 'You need to fill with the password',
                    },
                  })}
                  error={errors.password?.message}
                />
              </div>

              <div className='flex flex-col items-start justify-center'>
                <div className='flex w-full justify-end pt-2'>
                  <button
                    type='button'
                    onClick={handleForgetPassword}
                    className='text-heading text-xs no-underline hover:text-brand-dark hover:underline focus:text-brand-dark focus:outline-none ltr:text-right'
                  >
                    {'Forgot Password'}
                  </button>
                </div>
                <div className='flex w-full flex-row justify-between pt-10'>
                  <div className='flex items-center gap-x-4'>
                    <label className='switch relative inline-block cursor-pointer'>
                      <Switch checked={remember} onChange={setRemember} />
                    </label>
                    <label
                      htmlFor='remember'
                      className='mt-1 text-base text-black '
                    >
                      {'Remember me'}
                    </label>
                  </div>
                  <div className='mt-1 flex'>
                    <button
                      type='button'
                      onClick={handlePrivacyPolicy}
                      className='text-xs text-black hover:no-underline focus:text-brand-dark focus:outline-none ltr:text-right'
                    >
                      {'Privacy Policy'}
                    </button>
                  </div>
                </div>
              </div>

              <div className='relative pt-5'>
                <Button
                  type='submit'
                  loading={isLoading}
                  disabled={!isValid}
                  className='h-11 w-full text-base tracking-normal md:h-12'
                  variant='formButton'
                >
                  {'Log in'}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
