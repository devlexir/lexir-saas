import Link from 'next/link';
import AnimationWrapper from '@utils/motion/landing-page-animantion';

const NextlevelSection = () => {
  return (
    <div className='flex w-full justify-center bg-[#f9f9f9] pt-10 pb-5'>
      <AnimationWrapper>
        <div className='flex h-full w-full max-w-[1920px] flex-col items-center justify-center px-4 sm:px-10 lg:px-20'>
          <h2 className='mb-10 text-center font-Source_Serif_Pro text-3xl font-bold lg:gap-x-2'>
            Take Your Distribution to
            <span className=''> The Next Level</span>
          </h2>
          <div className='flex w-full max-w-2xl flex-col items-center'>
            <p className='text-center text-xl font-light text-[#2d2d2d] sm:font-normal'>
              Come see how you can benefit from our self-serve logistics and
              sales platform
            </p>
            <div className='my-12'>
              <Link href='/get-started'>
                <a className='rounded-md bg-[#2d2d2d] py-3 px-12 text-white hover:bg-[#3e3e3e]'>
                  GET STARTED
                </a>
              </Link>
            </div>
          </div>
        </div>
      </AnimationWrapper>
    </div>
  );
};

export default NextlevelSection;
