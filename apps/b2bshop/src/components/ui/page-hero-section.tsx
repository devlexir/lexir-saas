import Breadcrumb from '@components/ui/breadcrumb';
import { Attachment } from '@framework/basic-rest/types';
import useWindowSize from '@utils/use-window-size';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';

interface HeaderProps {
  backgroundThumbnail?: Attachment | string;
  heroTitle?: string;
  mobileBackgroundThumbnail?: Attachment | string;
  variant?: 'default' | 'white';
  className?: string;
}

const PageHeroSection: React.FC<HeaderProps> = ({
  backgroundThumbnail = '/assets/images/page-hero-bg.png',
  heroTitle = '',
  mobileBackgroundThumbnail = '/assets/images/page-hero-bg-mobile.png',
  variant = 'default',
  className = '',
}) => {
  const { t } = useTranslation('common');
  const { width } = useWindowSize();
  return (
    <div
      className={cn(
        'page-header-banner flex w-full justify-center bg-cover bg-center bg-no-repeat py-20 md:min-h-[250px] lg:min-h-[288px]',
        {
          'style-variant-white': variant === 'white',
        },
        className
      )}
      style={{
        backgroundImage: `url(${
          width! > 480 ? backgroundThumbnail : mobileBackgroundThumbnail
        })`,
      }}
    >
      <div className='relative flex w-full flex-col items-center justify-center'>
        <h2
          className={cn(
            'text-center text-xl font-bold md:text-2xl lg:text-3xl 2xl:text-[40px]',
            {
              'text-brand-dark': variant === 'default',
              'text-brand-light': variant === 'white',
            }
          )}
        >
          <span className='mb-3 block font-manrope font-bold md:mb-4 lg:mb-5 2xl:mb-7 '>
            {heroTitle}
          </span>
        </h2>
        {/* <Breadcrumb /> */}
      </div>
    </div>
  );
};

export default PageHeroSection;
