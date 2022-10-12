import { CircleDimmedSvg } from '@assets/brands-lexir/circle_dimmed_svg';
// ** SVGs ** //
import { CircleSvg } from '@assets/brands-lexir/circle_svg';
// ** Images ** //
import mapChartImg from '@assets/brands-lexir/map_chart.png';
// ** Flags SGVs ** //
import { FranceFlag } from '@assets/brands-lexir/svgsFlag/france_flag';
import { GermanyFlag } from '@assets/brands-lexir/svgsFlag/germany_flag';
import { ItalyFlag } from '@assets/brands-lexir/svgsFlag/italy_flag';
import { Netherlands } from '@assets/brands-lexir/svgsFlag/netherlands_flag';
import { PortugalFlag } from '@assets/brands-lexir/svgsFlag/portugal_flag';
import { SpainFlag } from '@assets/brands-lexir/svgsFlag/spain_flag';
import { UkFlag } from '@assets/brands-lexir/svgsFlag/uk_flag';
import AnimationWrapper from '@utils/motion/landing-page-animantion';
import Image from 'next/image';

const DistributionMarkets = () => {
  return (
    <AnimationWrapper>
      <div className='flex w-full justify-center'>
        <div className='flex min-h-fit w-full max-w-[1920px] flex-col items-center sm:grid sm:grid-cols-2 sm:px-5 md:px-10 lg:gap-x-12 lg:px-20 '>
          <div className='sm:max-w-lg'>
            <h2 className='text-left font-Source_Serif_Pro text-3xl font-bold leading-tight sm:text-5xl'>
              Distribution <span className=''>Markets</span>
            </h2>
            <div className='mt-12 flex gap-4 sm:block md:mt-8'>
              <div className='mb-4 flex w-full flex-col text-16  leading-tight text-[#2d2d2d] lg:mb-8'>
                <h3 className='mb-2 flex h-14 items-center gap-4 text-xl font-bold sm:text-3xl'>
                  Available Markets
                  <span className='hidden md:block'>
                    <CircleSvg />
                  </span>
                </h3>
                <span className='flex h-10 items-center gap-x-1'>
                  <FranceFlag /> France
                </span>
                <span className='flex h-10 items-center gap-x-1'>
                  <UkFlag />
                  UK
                </span>
                <span className='flex h-10 items-center gap-x-1'>
                  <PortugalFlag />
                  Portugal
                </span>
              </div>
              <div className='flex w-full flex-col text-base text-[#2d2d2d]'>
                <h3 className='mb-2 flex gap-4 text-xl font-bold sm:items-center sm:text-3xl'>
                  <span className='sm:hidden'>
                    Coming <br /> Soon
                  </span>
                  <span className='hidden sm:block'>Coming Soon</span>
                  <span className='hidden md:block'>
                    <CircleDimmedSvg />
                  </span>
                </h3>
                <span className='flex h-10 items-center gap-x-1'>
                  <SpainFlag />
                  Spain
                </span>
                <span className='flex h-10 items-center gap-x-1'>
                  <ItalyFlag />
                  Italy
                </span>
                <span className='flex h-10 items-center gap-x-1'>
                  <GermanyFlag />
                  Germany
                </span>
                <span className='flex h-10 items-center gap-x-1'>
                  <Netherlands />
                  Netherlands
                </span>
              </div>
            </div>
          </div>
          <div className='mx-8 mt-8 sm:mx-0 sm:mt-0'>
            <Image
              src={mapChartImg}
              alt='Map of western Europe highlighting the countries France, Portugal, and the UK'
              className='rounded-tr-[128px] sm:rounded-tr-[256px]'
            />
          </div>
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default DistributionMarkets;
