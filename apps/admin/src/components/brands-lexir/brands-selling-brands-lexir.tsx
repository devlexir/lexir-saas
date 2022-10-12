// ** Brands Logos ** //
import argalaLogo from '@assets/brands-lexir/svgsBrandsLogo/argala_logo.png';
import baldoriaLogo from '@assets/brands-lexir/svgsBrandsLogo/baldoria_logo.svg';
import empirical_spirits_logo from '@assets/brands-lexir/svgsBrandsLogo/empirical_spirits_logo.svg';
import erikaLogo from '@assets/brands-lexir/svgsBrandsLogo/erika_logo.svg';
import kever_logo from '@assets/brands-lexir/svgsBrandsLogo/kever_logo.svg';
import mezcal_union_logo from '@assets/brands-lexir/svgsBrandsLogo/mezcal_union_logo.svg';
import ninefold_distillery_logo from '@assets/brands-lexir/svgsBrandsLogo/ninefold_distillery_logo.svg';
import novo_fogo_logo from '@assets/brands-lexir/svgsBrandsLogo/novo_fogo_logo.svg';
import odvi_logo from '@assets/brands-lexir/svgsBrandsLogo/odvi_logo.svg';
import rebel_city_distillery_logo from '@assets/brands-lexir/svgsBrandsLogo/rebel_city_distillery_logo.svg';
import siwu_logo from '@assets/brands-lexir/svgsBrandsLogo/siwu_logo.svg';
import stockholms_bränneri_logo from '@assets/brands-lexir/svgsBrandsLogo/stockholms_bränneri_logo.svg';
import vink_whisky_logo from '@assets/brands-lexir/svgsBrandsLogo/vink_whisky_logo.svg';
import Image from 'next/image';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import AnimationWrapper from '@utils/motion/landing-page-animantion';

const logos = [
  vink_whisky_logo,
  stockholms_bränneri_logo,
  siwu_logo,
  rebel_city_distillery_logo,
  odvi_logo,
  novo_fogo_logo,
  ninefold_distillery_logo,
  mezcal_union_logo,
  kever_logo,
  empirical_spirits_logo,
  argalaLogo,
  baldoriaLogo,
  erikaLogo,
];

const BrandsSellingSection = () => {
  return (
    <AnimationWrapper>
      <div className='flex w-full items-center justify-center sm:my-24'>
        <div className='flex min-h-fit w-full flex-col px-0 '>
          <div className='flex w-full flex-col items-center '>
            <h2 className='mb-10  text-center font-Source_Serif_Pro text-2xl font-bold leading-tight text-[#2d2d2d] sm:px-5 sm:text-left sm:text-3xl'>
              Join Other World-Class
              <span className='pl-2 text-[#1c8c64]'>
                Brands Selling With Lexir
              </span>
            </h2>
            <div className='mt-4 grid grid-cols-4 grid-rows-2 gap-5 px-5 md:hidden'>
              <Image src={vink_whisky_logo} height={55} width={90} />
              <Image src={stockholms_bränneri_logo} height={55} width={90} />
              <Image src={siwu_logo} height={55} width={90} />
              <Image src={rebel_city_distillery_logo} height={55} width={90} />
              <Image src={odvi_logo} height={55} width={90} />
              <Image src={empirical_spirits_logo} height={55} width={90} />
              <Image src={mezcal_union_logo} height={55} width={90} />
              <Image src={kever_logo} height={55} width={90} />
            </div>

            <Swiper
              style={{
                /* @ts-ignore */
                '--transition-timing-function': 'linear',
              }}
              settransition='linear'
              autoplay={{
                delay: 0.1,
                disableOnInteraction: false,
              }}
              grabCursor={true}
              allowTouchMove={false}
              freeMode={{ enabled: true, sticky: false }}
              speed={2750}
              modules={[Autoplay, Pagination, Navigation]}
              loop={true}
              slidesPerView={10}
              className='hidden w-full justify-center overflow-clip md:flex'
            >
              {logos.map((logo, index) => (
                <SwiperSlide className='' key={`uniqueKey--${index}`}>
                  <Image src={logo} height={55} width={90} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default BrandsSellingSection;
