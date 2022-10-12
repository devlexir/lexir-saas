import type { GetStaticPaths } from 'next';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAtom } from 'jotai';

import RegistrationForm from '@components/auth/registration-form';
import Button from '@components/ui/button';
import Logo from '@components/ui/logo';

import { getAuthCredentials, isAuthenticated } from '@utils/auth-utils';
import { ROUTES } from '@utils/routes';

import { BarGirlImg } from '@assets/login/bar_girl_svg';
import { loginAtom, registerAtom } from '@contexts/login_register';

export const getStaticProps: GetStaticProps = async () => ({
  props: {},
});

export default function RegisterPage() {
  const [registerMobile, setRegisterMobile] = useAtom(registerAtom);
  const [loginMobile, setLoginMobile] = useAtom(loginAtom);

  const router = useRouter();
  const { token, permissions } = getAuthCredentials();
  if (isAuthenticated({ token, permissions })) {
    router.replace(ROUTES.DASHBOARD);
  }

  function handleClickSignUp() {
    setRegisterMobile(true);
    setLoginMobile(false);
  }

  function handleClickLogin() {
    setRegisterMobile(false);
    setLoginMobile(true);
  }
  return (
    <>
      <div className='absolute top-8 left-4 md:left-10'>
        <Logo />
      </div>

      <div className='flex h-screen w-full md:grid md:grid-cols-2'>
        <div className='hidden w-full justify-center px-10 py-8 shadow-lg md:flex'>
          <div className='flex w-full max-w-md flex-col justify-center'>
            <h2 className='mb-12 mt-16 text-4xl font-bold text-[#4F4F4F]'>
              Sign up
            </h2>
            <RegistrationForm />
          </div>
        </div>
        <div
          className='hidden h-screen w-full flex-col items-center justify-center 
          bg-gradient-to-b from-[#1C8C6405] to-[#1C8C6430] py-10 md:flex md:h-full'
        >
          <div className='flex w-fit flex-col justify-center'>
            <div className='max-w-xs text-[#4F4F4F] sm:max-w-sm lg:max-w-lg'>
              <h2 className='mb-10 mt-20 text-left text-3xl font-bold md:mt-4 md:mb-12 md:text-4xl'>
                Welcome to Lexir!
              </h2>
              <p className='max-w-[256px] text-left text-xl sm:max-w-sm md:mb-20 md:text-2xl'>
                We help craft alcohol brands from around the world launch & grow
                in new markets!
              </p>
            </div>

            <div className='flex justify-center'>
              <BarGirlImg className='max-w-xs lg:max-w-fit' />
            </div>
          </div>
        </div>
        {registerMobile ? (
          <div className='flex h-min min-h-screen w-full justify-center px-5 py-8 pt-10 shadow-lg md:hidden'>
            <div className='flex h-min w-full max-w-md flex-col justify-center '>
              <h2 className='mb-12 mt-16 text-4xl font-bold text-[#4F4F4F]'>
                Sign up
              </h2>
              <RegistrationForm />
            </div>
          </div>
        ) : (
          <div
            className='flex h-min min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-[#1C8C6405] to-[#1C8C6430] py-10
            md:hidden md:h-full'
          >
            <div className='flex w-fit flex-col justify-center pt-10'>
              <div className='max-w-xs text-[#4F4F4F] sm:max-w-sm lg:max-w-lg'>
                <h2 className='mb-10 mt-20 text-left text-3xl font-bold md:mt-4 md:mb-12 md:text-4xl'>
                  Welcome to Lexir!
                </h2>
                <p className='max-w-[256px] text-left text-xl sm:max-w-sm md:mb-20 md:text-2xl'>
                  We help craft alcohol brands from around the world launch &
                  grow in new markets!
                </p>
              </div>

              <div className='flex justify-center'>
                <BarGirlImg className='max-w-xs lg:max-w-fit' />
              </div>
            </div>
            <div className='flex gap-4 md:hidden'>
              <Button
                variant='outline'
                className='w-40 border-white text-[#4F4F4F]'
                onClick={handleClickSignUp}
              >
                SIGN UP
              </Button>
              <Button className='w-40' onClick={handleClickLogin}>
                <Link href='/login'>LOGIN</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};
