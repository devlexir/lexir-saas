import Link from 'next/link';
import { useRouter } from 'next/router';

import { CloseIcon } from '@components/icons/close-icon';
import ProgressBar from '@components/welcome-lexir/form/progress-bar';

import { Retangle } from '@assets/change-password-first-login/retangle_svg';

type FormStep = {
  step: string;
  progress: number;
  title: string;
  subTitle?: string;
  input: any;
  image?: any;
  selectedProduct?: string | null;
};

const WelcomeLexirFormLastStep = ({
  step,
  progress,
  title,
  subTitle,
  input,
  image,
}: FormStep) => {
  const { query } = useRouter();

  return (
    <>
      <div className='flex h-screen w-full flex-col'>
        <div className='flex justify-end px-4 py-4'>
          <Link href={`/onboarding/brands/${query.id}/edit`} passHref>
            <CloseIcon className='h-12 w-12 text-gray-300 hover:text-red-400' />
          </Link>
        </div>

        <div className='flex w-full flex-col'>
          <div className='flex min-h-screen w-full'>
            <div className='z-30 flex h-full min-h-min w-full justify-center px-10 py-8'>
              <div className='flex h-1/3 w-full max-w-md flex-col '>
                <ProgressBar step={step} progress={progress} />
                <div className='flex flex-col pt-10 md:pt-22'>
                  <h2 className='mb-4 mt-4 text-3xl font-bold text-[#4F4F4F] md:mb-8 md:text-4xl'>
                    {title}
                  </h2>
                  {subTitle && (
                    <span className='mb-2 max-w-sm text-base text-[#4F4F4F] md:mb-4 md:text-xl'>
                      {subTitle}
                    </span>
                  )}
                  <div className=''>{input}</div>
                </div>
              </div>
            </div>

            <div className='relative hidden w-full md:flex md:h-full'>
              {image}
              <Retangle className='absolute right-0 top-10 w-[512px] 2xl:w-[1024px]' />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomeLexirFormLastStep;
