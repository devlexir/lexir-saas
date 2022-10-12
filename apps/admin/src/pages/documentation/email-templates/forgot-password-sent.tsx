import { Retangle } from '@assets/change-password-first-login/retangle_svg'
import { ForgotPasswordBottleSvg } from '@assets/forgot-password-sent/forgot_password_bottle_svg'
import ResentEmailPassword from '@components/auth/forget-password/forget-password-sent-'
import RemenberPasswordButton from '@components/forgot-password/remenber-password-button'
import Logo from '@components/ui/logo'

const ForgotedPasswordSent = () => {
  return (
    <>
      <div className="absolute top-8 left-4 md:left-10">
        <Logo />
      </div>

      <div className="flex h-screen w-full">
        <div className="z-40 hidden w-full justify-center px-10 py-8 md:flex">
          <div className="flex w-full max-w-md flex-col justify-center ">
            <h2 className="mb-8 mt-4 text-4xl font-bold text-[#4F4F4F]">
              E-mail sent
            </h2>
            <span className="mb-32 max-w-xs text-xl text-[#4F4F4F]">
              {`An e-mail has been sent to`}{' '}
              <span className="font-semibold">martin@martin.com</span>{' '}
              {`with further
              instructions`}
            </span>
            <ResentEmailPassword />
            <RemenberPasswordButton />
          </div>
        </div>

        <div className="relative hidden w-full md:flex md:h-full">
          <ForgotPasswordBottleSvg className="absolute -left-72 bottom-0 z-30 md:w-[600px] lg:-left-96 lg:w-[800px] xl:w-[900px] 2xl:w-[1024px]" />
          <Retangle className="absolute top-10 right-0 2xl:w-[1024px]" />
        </div>

        <div className="flex w-full justify-center px-5 py-8 shadow-lg md:hidden">
          <div className="flex w-full max-w-md flex-col justify-center">
            <h2 className="mb-10 mt-4 text-3xl font-bold text-[#4F4F4F]">
              Forgot password
            </h2>
            <span className="mb-32 max-w-xs text-base text-[#4F4F4F]">
              Enter your e-mail and we’ll send you the instructions to create a
              new password.
            </span>
            <ResentEmailPassword />
            <RemenberPasswordButton />
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgotedPasswordSent
