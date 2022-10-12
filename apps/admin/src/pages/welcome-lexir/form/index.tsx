import Link from 'next/link';

import Button from '@components/ui/button';
import Logo from '@components/ui/logo';
import FooterWelcomeLexir from '@components/welcome-lexir/footer-welcome-lexir';

import { LoginSuccessSvg } from '@assets/change-password-first-login-sucess/login_success_svg';
import { PartyEmojiSvg } from '@assets/change-password-first-login-sucess/party_popper_emoji';
import { Retangle } from '@assets/change-password-first-login/retangle_svg';
import { useStateMachine } from 'little-state-machine';

import updateAction from './updateAction';

const WelcomeLexirFormFinalPage = () => {
  const { actions, state } = useStateMachine({ updateAction });

  function handleClickOK() {
    actions.updateAction({
      formDetail: {
        brand_name: '',
        brand_based: '',
        brand_market: '',
        brand_website: '',
        brand_website_url: '',
        bottles_annually: '',
        market_begin: '',
        type_spirit: '',
        type_wine: '',
      },
    });
  }

  return (
    <>
      <div className='absolute top-8 left-4 md:left-10'>
        <Logo />
      </div>

      <div className='flex h-screen w-full'>
        <div className='z-30 hidden w-full justify-center px-10 py-8 md:flex'>
          <div className='flex w-full max-w-md flex-col justify-center '>
            <h2 className='mb-8 mt-4 flex items-center gap-x-2 text-4xl font-bold text-[#4F4F4F]'>
              Congrats! <PartyEmojiSvg />
            </h2>

            <span className='mb-8 text-xl text-[#4F4F4F]'>
              Your brand{' '}
              <span className='text-xl font-bold text-[#6F6F6F]'>
                {state?.formDetail?.brand_name}
              </span>{' '}
              has been created!
            </span>
            <span className='mb-24 text-2xl font-bold text-[#4F4F4F]'>
              You’re being redirected to Brands Page
            </span>
            <Link href='/welcome-lexir'>
              <Button onClick={handleClickOK}>OK</Button>
            </Link>
          </div>
        </div>

        <div className='relative hidden w-full md:flex md:h-full'>
          <LoginSuccessSvg className='absolute inset-x-0 top-[35%] z-40 w-full' />
          <Retangle className='absolute right-0 top-10 w-[512px] 2xl:top-[10%] 2xl:w-[1024px]' />
        </div>

        <div className='flex w-full justify-center px-5 py-8 shadow-lg md:hidden'>
          <div className='flex w-full max-w-md flex-col justify-center'>
            <h2 className='mb-8 mt-8 flex items-center text-3xl font-bold text-[#4F4F4F]'>
              Congrats! <PartyEmojiSvg />
            </h2>
            <span className='mb-6 text-base text-[#4F4F4F]'>
              Your brand{' '}
              <span className='text-lg font-bold text-[#6F6F6F]'>
                {state?.formDetail?.brand_name}
              </span>{' '}
              has been created!
            </span>
            <span className='mb-20 text-xl font-bold text-[#4F4F4F]'>
              You’re being redirected to Brands Page
            </span>
            <div className='relative mb-10 flex w-full justify-center'>
              <LoginSuccessSvg className='z-40 h-44 w-60 ' />
              <Retangle className='absolute -top-10 -right-5 h-52 w-72 overflow-hidden	' />
            </div>
            <Link href='/welcome-lexir'>
              <Button onClick={handleClickOK}>OK</Button>
            </Link>
          </div>
        </div>
        <div className='absolute bottom-0 hidden w-full md:block'>
          <FooterWelcomeLexir />
        </div>
      </div>
    </>
  );
};

export default WelcomeLexirFormFinalPage;
