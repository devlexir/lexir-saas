import Link from 'next/link';
import { useRouter } from 'next/router';

import { CloseIcon } from '@components/icons/close-icon';
import Button from '@components/ui/button';

const WelcomeLexir = () => {
  const { query } = useRouter();

  return (
    <>
      <div className='flex h-screen w-full flex-col'>
        <div className='flex justify-end px-4 py-4'>
          <Link href={`/onboarding/brands/${query.id}/edit`} passHref>
            <CloseIcon className='h-12 w-12 text-gray-300 hover:text-red-400' />
          </Link>
        </div>
        <div className='z-30 flex h-screen w-full justify-center px-10'>
          <div className='flex w-full max-w-md flex-col items-center justify-center lg:pt-0'>
            <h2 className='mb-12 mt-4 flex items-center gap-x-2 text-4xl font-bold text-[#4F4F4F]'>
              Welcome to Lexir!
            </h2>

            <span className='mb-8 text-start text-lg text-[#4F4F4F] md:text-center'>
              Add a New Brand!
            </span>
            <Link
              href={`/onboarding//welcome-lexir/${query.id}/brand-name`}
              passHref
            >
              <Button className='w-full max-w-xs uppercase'>
                Add A NEW BRAND
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomeLexir;
