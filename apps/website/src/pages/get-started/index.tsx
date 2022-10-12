import FooterBrandsLexir from '@components/brands-lexir/footer-brands-lexir';
import GetStartedForm from '@components/brands-lexir/get-started-form';
import NavbarBrandsLexir from '@components/brands-lexir/navbar-brands-lexir';
import { ArrowPrevWithTail } from '@components/icons/arrow-prev-with-tail';
import Link from 'next/link';

const GetStarted = () => {
  return (
    <div className='flex flex-col'>
      <div className='flex justify-center px-5 md:px-0'>
        <NavbarBrandsLexir />
      </div>

      <div className='flex justify-center bg-[#F9F9F9] py-8 sm:py-12'>
        <div className='min-h-min w-full max-w-[1920px] gap-y-4 px-1 md:px-6 lg:px-16 2xl:flex 2xl:flex-col 2xl:justify-center'>
          <Link href='/'>
            <a className='mb-8 flex w-fit content-center items-center gap-x-2 px-4 text-base font-semibold text-[#CCCCCC] sm:mb-12 sm:text-xl md:gap-x-4 '>
              <ArrowPrevWithTail />
              Back to Homepage
            </a>
          </Link>
          <h1 className='px-4 pb-4 text-left font-Source_Serif_Pro text-5xl font-bold text-[#2d2d2d]'>
            Distribute With Lexir
          </h1>
          <GetStartedForm subdomain='pageProps.subdomain' />
        </div>
      </div>
      <FooterBrandsLexir />
    </div>
  );
};

export default GetStarted;
