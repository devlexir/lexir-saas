import { Retangle } from '@assets/change-password-first-login/retangle_svg'
import { CloseIcon } from '@components/icons/close-icon'
import ProgressBar from '@components/welcome-lexir/form/progress-bar'
import Link from 'next/link'
import { useRouter } from 'next/router'

type FormStep = {
  step: string
  progress: number
  title: string
  subTitle?: string
  input: any
  image?: any
}

const WelcomeLexirFormStep = ({
  step,
  progress,
  title,
  subTitle,
  input,
  image,
}: FormStep) => {
  const { query } = useRouter()

  return (
    <>
      <div className="flex h-screen w-full flex-col">
        <div className="flex justify-end px-4 py-4">
          <Link href={`/onboarding/brands/${query.id}/edit`} passHref>
            <CloseIcon className="h-12 w-12 text-gray-300 hover:text-red-400" />
          </Link>
        </div>
        <div className="flex h-[90vh] w-full">
          <div className="z-30 flex h-full w-full items-center justify-center px-10 py-8">
            <div className="flex h-fit w-full max-w-md flex-col gap-y-10">
              <ProgressBar step={step} progress={progress} />
              <div className="flex flex-col justify-center">
                <h2 className="mb-4 mt-4 text-3xl font-bold text-[#4F4F4F] md:mb-8 md:text-4xl">
                  {title}
                </h2>
                {subTitle && (
                  <span className="mb-6 max-w-sm text-base text-[#4F4F4F] md:mb-12 md:text-xl">
                    {subTitle}
                  </span>
                )}
                <div className="">{input}</div>
              </div>
            </div>
          </div>

          <div className="relative hidden w-full md:block ">
            <span className="hidden lg:flex">{image}</span>
            <Retangle className="absolute right-0 top-[10%] w-[512px] 2xl:w-[1024px]" />
          </div>
        </div>
      </div>
    </>
  )
}

export default WelcomeLexirFormStep
