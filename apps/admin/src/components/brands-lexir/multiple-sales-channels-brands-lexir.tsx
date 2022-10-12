// ** Images ** //
import customerReportImg from '@assets/brands-lexir/customer_report_img.png';
import AnimationWrapper from '@utils/motion/landing-page-animantion';
import Image from 'next/image';

const MultipleSalesChannelSection = () => {
  return (
    <AnimationWrapper>
      <div className='flex w-full justify-center md:h-[70vh]'>
        <div className='flex min-h-fit w-full max-w-[1920px] flex-col items-center justify-between gap-x-4 sm:px-5 md:grid md:grid-cols-2 md:gap-x-12 md:px-10 lg:px-20 xl:gap-x-24'>
          <div>
            <h2 className='mb-6 text-left font-Source_Serif_Pro text-3xl font-bold leading-tight text-[#2d2d2d] sm:mb-10 sm:max-w-md sm:text-5xl'>
              Plug into Multiple <br />
              <span className=''>Sales Channels</span>
            </h2>
            <p className='text-left text-lg leading-relaxed text-[#2d2d2d]'>
              Who better to represent your brand than you? Lexir acts as an
              extension of you, providing the infrastructure you need to sell
              through any channel.
              <br /> <br />
              <div className='text-left'>
                ✔ Local sales agents
                <br />
                ✔ Integrations with your own site
                <br />
                ✔ Lexir&apos;s online shop
                <br />
              </div>
            </p>
          </div>
          <div className='mt-12 md:mt-0'>
            <Image src={customerReportImg} alt='' />
          </div>
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default MultipleSalesChannelSection;
