import Image from 'next/image';

interface Testimonial {
  logo: string;
  testimony: string;
  author: string;
  enterprise: string;
}

type TestimonialCardProps = {
  testimonial: Testimonial;
};

const TestimonialCard = ({
  testimonial: { logo, testimony, author, enterprise },
}: TestimonialCardProps) => (
  <div className='w-full flex-col items-start gap-[10px] rounded-[5px] p-0 pt-[15px] pb-[17.5px] lg:w-[279px] lg:pt-[30px] lg:pb-[29px] 2xl:w-[239px] 2xl:pt-7 2xl:pb-6'>
    <div className='flex justify-center'>
      <Image
        src={logo}
        width={92}
        height={56}
        alt='Testimonial Image'
        objectFit='contain'
        objectPosition='center'
      />
    </div>
    <p className='order-[0] mt-3 h-[76px] w-full flex-none flex-grow-0 indent-2 font-sans text-16 font-light leading-[22px] lg:mt-[5px] lg:h-[132px] 2xl:mt-3'>
      {testimony}
    </p>
    <hr className='order-1 mt-[10px] w-[70px] border-[#ccc]' />
    <div className='order-2 mt-[10px] flex  flex-none flex-grow-0 flex-col items-start p-0'>
      <h3 className='order-[0] flex-none flex-grow-0 font-serif text-[14px] font-semibold capitalize leading-[14.7px] lg:text-16 lg:leading-[16.8px]'>
        {author}
      </h3>
      <h4 className='order-1 flex-none flex-grow-0 font-sans text-12 font-light leading-[18px] lg:text-[14px] lg:leading-[21px]'>
        {enterprise}
      </h4>
    </div>
  </div>
);

type ImagesLayoutProps = {
  images: Array<string>;
};

const ImagesLayout = ({ images }: ImagesLayoutProps) => {
  const [src1, src2, src3, src4] = images;
  return (
    <div className='grid h-full w-full grid-cols-3 grid-rows-3 gap-[10px]'>
      <div className='relative col-span-2 row-span-2 '>
        <Image
          src={src1}
          layout='fill'
          objectFit='cover'
          objectPosition='center'
        />
      </div>
      <div className='relative col-start-1 col-end-2 row-start-3 row-end-4'>
        <Image
          src={src2}
          layout='fill'
          objectFit='cover'
          objectPosition='center'
        />
      </div>
      <div className='relative col-start-3 col-end-4 row-start-1 row-end-3'>
        <Image
          src={src3}
          layout='fill'
          objectFit='cover'
          objectPosition='center left'
        />
      </div>
      <div className='relative col-start-2 col-end-4 row-start-3 row-end-4'>
        <Image
          src={src4}
          layout='fill'
          objectFit='cover'
          className='rounded-br-[140px]'
          objectPosition='center'
        />
      </div>
    </div>
  );
};

type Props = {
  images: Array<string>;
  testimonials: Array<Testimonial>;
};

const SectionTestimonialsImages = ({ images, testimonials }: Props) => {
  return (
    <section>
      <h1 className='mx-auto w-full max-w-[664px] text-center font-serif text-32 font-bold leading-[33px] lg:text-[48px] lg:leading-[50px] 2xl:max-w-full'>
        Join Other Businesses
        <span className='text-accent'> Supporting Creaft Brands</span>
      </h1>

      <div className='mt-[60px] flex flex-col items-center 2xl:relative 2xl:flex-row'>
        <div className='flex w-full flex-wrap  text-[#2d2d2d] 2xl:w-3/5 2xl:justify-end'>
          {/* Testimonial Card */}
          <div className='flex w-full flex-col lg:flex-row'>
            <div className='flex w-full flex-row-reverse  px-[15px] lg:w-1/2 lg:pl-0 lg:pr-[50px] 2xl:w-auto 2xl:flex-1 2xl:pr-[35px]'>
              <TestimonialCard testimonial={testimonials[0]} />
            </div>
            <div className='flex w-full bg-white px-[15px] lg:w-1/2 lg:pr-0 lg:pl-[50px] 2xl:w-auto 2xl:pl-[35px] 2xl:pr-[70px]'>
              <TestimonialCard testimonial={testimonials[1]} />
            </div>
          </div>
          <div className='flex w-full flex-col lg:flex-row'>
            <div className='flex w-full flex-row-reverse bg-white px-[15px]  lg:w-1/2 lg:pl-0 lg:pr-[50px] 2xl:w-auto 2xl:flex-1 2xl:pr-[35px]'>
              <TestimonialCard testimonial={testimonials[2]} />
            </div>
            <div className='flex w-full px-[15px] lg:w-1/2 lg:pr-0 lg:pl-[50px] 2xl:w-auto 2xl:pl-[35px] 2xl:pr-[70px]'>
              <TestimonialCard testimonial={testimonials[3]} />
            </div>
          </div>
        </div>
        <div className='h-[237px] w-full px-[15px] lg:h-[510px] lg:max-w-[738px] lg:px-0 2xl:absolute 2xl:top-0 2xl:right-0 2xl:mt-0 2xl:h-full 2xl:w-2/5 2xl:max-w-none'>
          <ImagesLayout images={images} />
        </div>
      </div>
    </section>
  );
};

export default SectionTestimonialsImages;
