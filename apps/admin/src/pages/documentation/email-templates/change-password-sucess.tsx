import { Retangle } from '@assets/change-password-first-login/retangle_svg'
import { LoginSuccessSvg } from '@assets/change-password-first-login-sucess/login_success_svg'
import { PartyEmojiSvg } from '@assets/change-password-first-login-sucess/party_popper_emoji'
import Button from '@components/ui/button'
import Logo from '@components/ui/logo'

const ChangePasswordSucess = () => {
  return (
    <>
      <div className="absolute top-8 left-4 md:left-10">
        <Logo />
      </div>

      <div className="flex h-screen w-full">
        <div className="z-30 hidden w-full justify-center px-10 py-8 md:flex">
          <div className="flex w-full max-w-md flex-col justify-center ">
            <h2 className="mb-8 mt-4 flex items-center gap-x-2 text-4xl font-bold text-[#4F4F4F]">
              Congrats! <PartyEmojiSvg />
            </h2>

            <span className="mb-8 max-w-xs text-xl text-[#4F4F4F]">
              Your password has been changed successfully!
            </span>
            <span className="mb-24 max-w-sm text-2xl font-bold text-[#4F4F4F]">
              Use your new password to login!
            </span>
            <Button className="w-full">CONTINUE</Button>
          </div>
        </div>

        <div className="relative hidden w-full md:flex md:h-full">
          <LoginSuccessSvg className="absolute inset-x-0 bottom-1/4	z-40 w-80 lg:w-96" />
          <Retangle className="absolute top-10 right-0 2xl:w-[1024px]" />
        </div>

        <div className="flex w-full justify-center px-5 py-8 shadow-lg md:hidden">
          <div className="flex w-full max-w-md flex-col justify-center">
            <h2 className="mb-8 mt-8 flex items-center text-3xl font-bold text-[#4F4F4F]">
              Congrats! <PartyEmojiSvg />
            </h2>
            <span className="mb-6 max-w-xs text-base text-[#4F4F4F]">
              Your password has been changed successfully!
            </span>
            <span className="mb-20 max-w-xs text-2xl font-bold text-[#4F4F4F]">
              Use your new password to login!
            </span>
            <div className="relative mb-10 flex w-full justify-center">
              <LoginSuccessSvg className="z-40 h-44 w-60 " />
              <Retangle className="absolute -top-10 -right-5 h-52 w-72 overflow-hidden	" />
            </div>
            <Button className="w-full">CONTINUE</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChangePasswordSucess
