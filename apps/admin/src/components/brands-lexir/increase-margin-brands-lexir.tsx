import AnimationWrapper from '@utils/motion/landing-page-animantion';
import { useLottie, useLottieInteractivity } from 'lottie-react';

import * as animationData from './bottles-lottie.json';

const options = {
  animationData: animationData,
};

const LottieAnimation = () => {
  const lottieObj = useLottie(options);
  const Animation = useLottieInteractivity({
    lottieObj,
    mode: 'scroll',
    actions: [
      {
        visibility: [0.3, 0.6],
        type: 'seek',
        frames: [0, 22],
      },
      {
        visibility: [0.7, 1.0],
        type: 'stop',
        frames: [23],
      },
    ],
  });

  return Animation;
};

const IncreaseMarginSection = () => {
  return (
    <AnimationWrapper>
      <div className='flex w-full justify-center'>
        <div className='flex min-h-fit w-full max-w-[1920px] flex-col items-center justify-between gap-x-0 sm:px-5 md:grid md:grid-cols-2 md:gap-x-24 md:px-10 lg:px-20 xl:gap-x-48'>
          <div>
            <h2 className='mb-4 text-left font-Source_Serif_Pro text-4xl font-bold leading-tight text-[#2d2d2d] sm:mb-10  sm:text-5xl'>
              Increase Your <span className=''>Margins</span>
            </h2>
            <p className='text-left text-lg leading-relaxed text-[#2d2d2d]'>
              Distribution channels are pricey, but they don't need to be! We
              simplified the supply chain so you can keep more of your margin
              and control your pricing with all of your clients.
            </p>
          </div>
          <div className='mt-8 flex justify-center md:mt-0'>
            <LottieAnimation />
          </div>
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default IncreaseMarginSection;
