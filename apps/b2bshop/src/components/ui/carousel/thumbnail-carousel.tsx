import {
  Swiper,
  SwiperSlide,
  SwiperOptions,
  Navigation,
  Thumbs,
} from '@components/ui/carousel/slider';
import Image from '@components/ui/image';
import { useRef, useState } from 'react';
import cn from 'classnames';
import { productGalleryPlaceholder } from '@assets/placeholders';
import { getDirection } from '@utils/get-direction';
import { useRouter } from 'next/router';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface Props {
  gallery: any[];
  thumbnailClassName?: string;
  galleryClassName?: string;
}

// product gallery breakpoints
const galleryCarouselBreakpoints = {
  '0': {
    slidesPerView: 4,
  },
};

const swiperParams: SwiperOptions = {
  slidesPerView: 1,
  spaceBetween: 0,
};

const ThumbnailCarousel: React.FC<Props> = ({
  gallery,
  thumbnailClassName = 'xl:w-[480px] 2xl:w-[650px]',
  galleryClassName = 'xl:w-28 2xl:w-[130px]',
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const { locale } = useRouter();
  const dir = getDirection(locale);

  return (
    <div className='w-full xl:flex xl:flex-row-reverse'>
      <div
        className={cn(
          'relative mb-2.5 flex w-full items-center overflow-hidden rounded-md border border-border-base bg-fill-secondary md:mb-3 xl:ltr:ml-5 xl:rtl:mr-5',
          thumbnailClassName
        )}
      >
        <Swiper
          id='productGallery'
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Navigation, Thumbs]}
          navigation={{
            prevEl: prevRef.current!, // Assert non-null
            nextEl: nextRef.current!, // Assert non-null
          }}
          {...swiperParams}
        >
          {gallery?.map((item: any) => (
            <SwiperSlide
              key={`product-gallery-${item.id}`}
              className='flex items-center justify-center'
            >
              <div className='flex items-center justify-center bg-fill-secondary py-10 '>
                <Image
                  src={item?.original ?? productGalleryPlaceholder}
                  alt={`Product gallery ${item.id}`}
                  width={650}
                  // layout='fill'
                  height={400}
                  className='rounded-lg'
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className='absolute top-2/4 z-10 flex w-full items-center justify-between px-2.5'>
          <div
            ref={prevRef}
            className='flex h-7 w-7 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full bg-brand-light text-base shadow-navigation transition duration-300 hover:bg-brand hover:text-brand-light focus:outline-none md:h-8 md:w-8 lg:h-9 lg:w-9 lg:text-lg xl:h-10 xl:w-10 xl:text-xl'
          >
            {dir === 'rtl' ? <IoIosArrowForward /> : <IoIosArrowBack />}
          </div>
          <div
            ref={nextRef}
            className='flex h-7 w-7 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full bg-brand-light text-base shadow-navigation transition duration-300 hover:bg-brand hover:text-brand-light focus:outline-none md:h-8 md:w-8 lg:h-9 lg:w-9 lg:text-lg xl:h-10 xl:w-10 xl:text-xl'
          >
            {dir === 'rtl' ? <IoIosArrowBack /> : <IoIosArrowForward />}
          </div>
        </div>
      </div>
      {/* End of product main slider */}

      <div className={`shrink-0 ${galleryClassName}`}>
        <Swiper
          id='productGalleryThumbs'
          onSwiper={setThumbsSwiper}
          spaceBetween={0}
          watchSlidesProgress={true}
          freeMode={true}
          observer={true}
          observeParents={true}
          breakpoints={galleryCarouselBreakpoints}
        >
          {gallery?.map((item: any) => (
            <SwiperSlide
              key={`product-thumb-gallery-${item.id}`}
              className='flex cursor-pointer items-center justify-center overflow-hidden rounded border border-border-base bg-fill-secondary transition hover:opacity-75'
            >
              <div className='flex items-center justify-center bg-fill-secondary py-5'>
                <Image
                  src={item?.thumbnail ?? productGalleryPlaceholder}
                  alt={`Product thumb gallery ${item.id}`}
                  width={170}
                  height={109}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ThumbnailCarousel;
