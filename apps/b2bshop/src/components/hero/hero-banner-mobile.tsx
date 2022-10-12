import Button from '@components/ui/button';
import useWindowSize from '@utils/use-window-size';
import Image from 'next/image';
import type { FC } from 'react';

interface BannerProps {
  banner?: any;
  className?: string;
  variant?: 'default' | 'slider' | 'medium';
}

function getImage(deviceWidth: number, imgObj: any) {
  return deviceWidth < 480 ? imgObj.mobile : imgObj.desktop;
}

const HeroBannerMobile: FC<BannerProps> = ({
  banner,
  className = 'py-20 xy:pt-24',
  variant = 'default',
}) => {
  const { width } = useWindowSize();
  const { title, description, image, green_title, button_text } = banner;
  const selectedImage = getImage(width!, image);
  return (
    <div className='mx-auto min-h-[427px] max-w-[1920px] pr-0 sm:p-4 sm:pl-8 md:p-0 md:pl-14 lg:pl-28'>
      <div className='relative flex min-h-[427px] items-center justify-between'>
        <div className='z-10 flex w-full flex-col items-center sm:items-start'>
          <div className='max-w-[356px] px-10 sm:px-0'>
            <div className='max-w-[356px] text-center font-source_serif_pro text-[44px] font-bold leading-[46px] text-brand-dark sm:max-w-[597px] sm:text-left sm:text-6xl sm:leading-[63px]'>
              {title}
              <span className='text-brand'>{green_title}</span>
            </div>
          </div>
          <div className='mx-8 mb-6 mt-4 max-w-[320px] text-center text-[20px] leading-6 sm:mb-0 sm:pr-4 sm:text-left sm:text-[25px] sm:leading-[30px] xs:mx-0'>
            {description}
          </div>
          <div className='flex pl-4 sm:hidden'>
            <Image
              src={'/assets/images/hero/hero-curated-mobile.png'}
              width={409.67}
              height={403.62}
              alt={'Hero banner image for mobile view'}
            />
          </div>
          <div className='flex sm:ml-0'>
            <Button className='mt-10 md:min-w-[336px] xs:max-w-[178px]'>
              {button_text}
            </Button>
          </div>
        </div>

        <div className='absolute right-0 hidden sm:flex'>
          <Image
            src={'/assets/images/hero/hero-curated-mobile.png'}
            width={409.67}
            height={403.62}
            alt={'Hero banner image for mobile view'}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroBannerMobile;
