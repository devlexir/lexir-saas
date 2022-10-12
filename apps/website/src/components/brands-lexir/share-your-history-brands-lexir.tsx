// ** Images ** //
import shareYourStoryImg from '@assets/brands-lexir/share_your_story_img.png';
import AnimationWrapper from '@utils/motion/landing-page-animantion';
import Image from 'next/image';

const ShareYourHistorySection = () => {
  return (
    <AnimationWrapper>
      <div className='flex w-full justify-center'>
        <div className='flex min-h-fit w-full max-w-[1920px] flex-col-reverse	items-center justify-between sm:gap-x-10 sm:px-5 md:grid md:grid-cols-2 md:gap-x-20 md:px-10 lg:px-20 xl:gap-x-48'>
          <div className='mt-12 md:mt-0'>
            <Image
              src={shareYourStoryImg}
              alt="Creators of a vermouth brand on Lexir's online shop"
            />
          </div>
          <div>
            <h2 className='mb-4 text-left font-Source_Serif_Pro text-3xl font-bold leading-tight sm:mb-10 sm:max-w-md sm:text-5xl'>
              A Stage To <br />
              <span className=''>Share Your Story</span>
            </h2>
            <p className='text-left text-lg leading-normal text-[#2d2d2d] sm:leading-relaxed'>
              You’re more than just a pretty bottle. With the help of our
              content team, Lexir works with you to share the stories,
              inspirations, and techniques behind your brand and each product in
              your collection.
            </p>
          </div>
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default ShareYourHistorySection;
