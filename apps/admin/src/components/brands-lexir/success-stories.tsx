// ** SVGs ** //
import React from 'react';

import Image from 'next/image';

import AnimationWrapper from '@utils/motion/landing-page-animantion';

import { QuoteLeft } from '@assets/brands-lexir/quote_left';
import { QuoteRigth } from '@assets/brands-lexir/quote_rigth';
// ** Brands Logos ** //
import argalaLogo from '@assets/brands-lexir/svgsBrandsLogo/argala_logo.png';
import baldoriaLogo from '@assets/brands-lexir/svgsBrandsLogo/baldoria_logo.svg';
import erikaLogo from '@assets/brands-lexir/svgsBrandsLogo/erika_logo.svg';
import { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

const stories = [
  {
    id: 1,
    logo: argalaLogo,
    text: `As a small independent brand, it was difficult for us to
        find something that met our needs. We are now able to
        launch and test out new markets without getting squeezed
        by traditional distribution channels. Lexir is the
        solution we had been looking for for years.`,
    founder: 'Piero',
    founder_subtext: 'Argala, Founder & CEO',
  },
  {
    id: 2,
    logo: baldoriaLogo,
    text: `Working together with Lexir and and using their solution,
         Baldoria has built a direct-to-consumer model that resonates with 
         consumers and exemplifies our brand identity. We wouldn’t have been
         able to do this without Lexir.`,
    founder: 'Daniel',
    founder_subtext: 'Baldoria, CEO',
  },
  {
    id: 3,
    logo: erikaLogo,
    text: `It's great to finally be able to focus on the things we
         actually enjoy instead of all that time consuming admin
         and bureaucracy. With Lexir we’ve been able to spend our
         time on product development and promotion instead!`,
    founder: 'Paul',
    founder_subtext: 'Erika, Founder',
  },
];
const SuccessStories = () => {
  return (
    <div className='flex w-full items-center justify-center bg-[#f9f9f9] py-10'>
      <div className='flex min-h-fit w-full max-w-7xl flex-col gap-x-24 px-0 lg:px-20 xl:gap-x-48'>
        <AnimationWrapper>
          <div className='flex w-full flex-col items-center '>
            <h2 className='mb-10 flex justify-center gap-x-2 font-Source_Serif_Pro text-3xl font-bold leading-tight sm:text-5xl'>
              <span className=''>Success</span>
              Stories
            </h2>
            <Swiper
              style={{
                /* @ts-ignore */
                '--swiper-navigation-color': '#1c8c64',
              }}
              rewind={true}
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              disabledclass='true'
              speed={1000}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className='flex w-full flex-row items-center justify-center '
            >
              {stories.map((story: any) => (
                <React.Fragment key={story.id}>
                  <SwiperSlide key={story.id}>
                    <div className='flex w-full flex-row items-center justify-center'>
                      <div className='flex w-full max-w-2xl flex-col items-center px-10 md:px-0'>
                        <div className='relative mb-5'>
                          <QuoteLeft className='absolute -left-72 hidden md:block' />
                          <Image
                            src={story.logo}
                            height={55}
                            width={90}
                            alt=''
                          />
                        </div>
                        <div className='relative'>
                          <p className='mx-2 text-center text-base text-[#2d2d2d] sm:mx-8 sm:text-lg sm:leading-relaxed md:mx-2'>
                            {story.text}
                          </p>
                          <QuoteRigth className='absolute top-24 right-0 hidden md:block' />
                        </div>
                        <div className='mt-5 flex flex-col items-center border-t pt-5'>
                          <h4 className='text-xl font-bold sm:text-2xl'>
                            {story.founder}
                          </h4>
                          <p className='text-xs text-[#2d2d2d] sm:text-base'>
                            {story.founder_subtext}
                          </p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                </React.Fragment>
              ))}
            </Swiper>
          </div>
        </AnimationWrapper>
      </div>
    </div>
  );
};

export default SuccessStories;
