import { Retangle } from '@assets/change-password-first-login/retangle_svg'
import { Briks } from '@assets/forgot-password-email-not-found/bricks_svg'
import { ForgotPasswordSearchingSvg } from '@assets/forgot-password-email-not-found/forgot_password_searching_svg'
import ForgotPassword from '@components/auth/forget-password/forget-password'
import RemenberPasswordButton from '@components/forgot-password/remenber-password-button'
import Logo from '@components/ui/logo'
import Link from 'next/link'

const ForgotedPasswordEmailNotFound = () => {
  return (
    <>
      <div className="absolute top-8 left-4 md:left-10">
        <Logo />
      </div>

      <div className="flex h-screen w-full">
        <div className="z-30 hidden w-full justify-center px-10 py-8 md:flex">
          <div className="flex w-full max-w-md flex-col justify-center ">
            <h2 className="mb-8 mt-4 text-4xl font-bold text-[#4F4F4F]">
              E-mail not found
            </h2>
            <span className="mb-10 max-w-sm text-xl text-[#4F4F4F]">
              The e-mail is not registered yet. Please, try another e-mail or{' '}
              <Link href="/sign-up">
                <a className="font-semibold text-[#1C8C64]">sign up</a>
              </Link>
            </span>
            <ForgotPassword />
            <RemenberPasswordButton />
          </div>
        </div>

        <div className="relative hidden w-full md:flex md:h-full">
          <ForgotPasswordSearchingSvg className="absolute inset-x-0 bottom-1/4	z-40 w-80 lg:w-96" />
          <Retangle className="absolute top-10 right-0 2xl:w-[1024px]" />
          <Briks className="absolute bottom-1/4 right-0 md:w-[512px] lg:right-16 2xl:w-[1024px]" />
        </div>

        <div className="flex w-full justify-center px-5 py-8 shadow-lg md:hidden">
          <div className="flex w-full max-w-md flex-col justify-center">
            <h2 className="mb-10 mt-4 text-3xl font-bold text-[#4F4F4F]">
              E-mail not found
            </h2>
            <span className="mb-8 max-w-xs text-base text-[#4F4F4F]">
              The e-mail is not registered yet. Please, try another e-mail or
              sign up
            </span>
            <ForgotPassword />
            <RemenberPasswordButton />
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgotedPasswordEmailNotFound
