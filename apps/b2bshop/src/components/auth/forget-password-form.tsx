import { useModalAction } from '@components/common/modal/modal.context';
import Button from '@components/ui/button';
import CloseButton from '@components/ui/close-button';
import Input from '@components/ui/form/input';
import Logo from '@components/ui/logo';
import {
  ForgetPasswordType,
  useForgetPasswordMutation,
} from '@framework/basic-rest/auth/use-forget-password';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const ForgetPasswordForm = () => {
  const { closeModal } = useModalAction();
  const { mutate: forgetPassword } = useForgetPasswordMutation();
  const [recoverySent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ForgetPasswordType>({
    mode: 'onChange',
  });

  function onSubmit({ email }: ForgetPasswordType) {
    forgetPassword({
      email,
    });
    closeModal();
  }

  return (
    <div
      className={
        'relative w-full md:w-[720px] lg:w-[920px] xl:w-[1000px] 2xl:w-[1200px]'
      }
    >
      <CloseButton onClick={closeModal} />
      <div className='mx-auto flex overflow-hidden rounded-lg bg-brand-light'>
        <div className='registration relative hidden md:block md:w-1/2 lg:w-[55%] xl:w-[60%]'>
          <Image
            src='/assets/images/login.jpeg'
            alt='signin Image'
            layout='fill'
          />
        </div>
        <div className='flex w-full flex-col justify-center rounded-md py-6 px-4 sm:py-10 sm:px-8 md:w-1/2 md:px-10 lg:w-[45%] lg:px-12 xl:w-[40%] '>
          <div className='text-center'>
            <div className='text-center'>
              <div onClick={closeModal}>
                <Logo />
              </div>
              <h4 className='mt-6 text-xl font-bold text-black sm:text-[22px] sm:leading-8'>
                {'Forgot Your password?'}
              </h4>
              <p className='mt-4 text-left text-base text-black'>
                {
                  'Enter the email address associated with your account, and we will email you a link to reset your password '
                }
              </p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit((data) => onSubmit(data))}
            className='mt-10 flex flex-col justify-center'
            noValidate
          >
            <Input
              label='Email'
              placeholder='Enter your email'
              type='email'
              variant='solid'
              {...register('email', {
                required: `${'Email is required!'}`,
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Enter a valid email address',
                },
              })}
              error={errors.email?.message}
            />
            {recoverySent ? (
              <div className='mt-5 bg-brand-tree py-2 px-2 text-center text-xs text-brand-dark'>
                {'A Recovery Password email has been sent to your account'}
              </div>
            ) : null}

            <div className='mt-5'>
              <Button
                type='submit'
                variant='formButton'
                disabled={!isValid}
                className='h-11 w-full  md:h-12'
              >
                {'Send reset link'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordForm;
