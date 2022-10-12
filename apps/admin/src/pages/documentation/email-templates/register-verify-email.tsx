import { Retangle } from '@assets/change-password-first-login/retangle_svg'
import { ForgotPasswordBottleSvg } from '@assets/forgot-password-sent/forgot_password_bottle_svg'
import ResentEmailPassword from '@components/auth/forget-password/forget-password-sent-'
import Logo from '@components/ui/logo'
import Link from 'next/link'

const RegisterVerifyEmail = () => {
  return (
    <>
      <div className="absolute top-8 left-4 md:left-10">
        <Logo />
      </div>

      <div className="flex h-screen w-full">
        <div className="z-40 hidden w-full justify-center px-10 py-8 md:flex">
          <div className="flex w-full max-w-md flex-col justify-center ">
            <h2 className="mb-8 mt-4 text-4xl font-bold text-[#4F4F4F]">
              Please verify your e-mail
            </h2>
            <span className="mb-6 max-w-xs text-xl text-[#6F6F6F]">
              {`You’re almost there! We sent an e-mail to `}
              <span className="font-semibold">martin@martin.com</span>
            </span>
            <span className="mb-14 max-w-xs text-xl text-[#6F6F6F]">
              {`Just click on the link in that e-mail to complete your signup. 
              If you don’t see it, you may need to `}
              <span className="font-semibold">check your span</span>
              {` folder.`}
            </span>
            <span className="mb-10 max-w-xs text-xl text-[#6F6F6F]">
              Still can’t find the e-mail?
            </span>
            <ResentEmailPassword label="RESEND E-MAIL" />
            <span className="mt-8 text-xl text-[#6F6F6F]">
              {`Need help? `}
              <Link href="/">
                <a className="font-semibold text-[#1C8C64]">Contact us</a>
              </Link>
            </span>
          </div>
        </div>

        <div className="relative hidden w-full md:flex md:h-full">
          <ForgotPasswordBottleSvg className="absolute -left-72 bottom-0 z-30 md:w-[600px] lg:-left-96 lg:w-[800px] xl:w-[900px] 2xl:w-[1024px]" />
          <Retangle className="absolute top-10 right-0 2xl:w-[1024px]" />
        </div>

        <div className="flex w-full justify-center px-5 py-8 shadow-lg md:hidden">
          <div className="flex w-full max-w-md flex-col justify-center">
            <h2 className="mb-6 mt-4 text-3xl font-bold text-[#4F4F4F]">
              Please verify your e-mail
            </h2>
            <span className="mb-6 max-w-xs text-base text-[#6F6F6F]">
              {`You’re almost there! We sent an e-mail to `}
              <span className="font-semibold">martin@martin.com</span>
            </span>
            <span className="mb-10 max-w-xs text-base text-[#6F6F6F]">
              {`Just click on the link in that e-mail to complete your signup. 
              If you don’t see it, you may need to `}
              <span className="font-semibold">check your span</span>
              {` folder.`}
            </span>
            <span className="mb-6 max-w-xs text-base text-[#6F6F6F]">
              Still can’t find the e-mail?
            </span>
            <ResentEmailPassword label="RESEND E-MAIL" />
            <span className="mt-8 text-lg text-[#6F6F6F]">
              {`Need help? `}
              <Link href="/">
                <a className="font-semibold text-[#1C8C64]">Contact us</a>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterVerifyEmail
