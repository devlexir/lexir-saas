import Button from '@components/ui/button';
import Heading from '@components/ui/heading';
import Image from 'next/image';
import type { FC } from 'react';

interface BannerProps {
  banner?: any;
  className?: string;
  variant?: 'default' | 'slider' | 'medium';
}

const HeroBanner: FC<BannerProps> = ({ banner }) => {
  const { title, description, green_title, button_text } = banner;
  return (
    <div className='mx-auto min-h-[427px] max-w-[1920px] p-4 pr-0 md:p-0 md:pl-8'>
      <div className='flex min-h-[427px] items-center justify-between'>
        <div className='flex w-full flex-col items-center sm:w-1/2 sm:items-start'>
          <div className='max-w-[597px] pr-4'>
            <Heading
              variant='collectionHeading'
              className='max-w-[440px] text-center sm:max-w-[597px] sm:text-left'
            >
              {title}
              <span className='text-brand'>{green_title}</span>
            </Heading>
          </div>
          <div className='mt-4 max-w-[440px] pr-4 text-center text-[20px] leading-6 sm:text-left sm:text-[22px] sm:leading-9'>
            {description}
          </div>
          <div className='flex sm:hidden'>
            <Image
              src={'/assets/images/hero/hero-curated.png'}
              width={568}
              height={433}
              alt={'Hero banner image'}
            />
          </div>
          <div className='-ml-4 flex sm:ml-0'>
            <Button className='mt-10 max-w-[178px] md:min-w-[336px]'>
              {button_text}
            </Button>
          </div>
        </div>

        <div className='hidden sm:flex'>
          <Image
            src={'/assets/images/hero/hero-curated.png'}
            width={568}
            height={433}
            alt={'Hero banner image'}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
