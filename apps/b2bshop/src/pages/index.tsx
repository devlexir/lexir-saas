import HaveBrandLexir from '@components/common/have-brand-lexir.tsx';
import HomepageAd from '@components/common/homepage-ad';
import HeroBanner from '@components/hero/hero-banner';
import HeroBannerMobile from '@components/hero/hero-banner-mobile';
import Layout from '@components/layout/layout-two';
import { ProductGrid } from '@components/product/product-grid';
import Seo from '@components/seo/seo';
import Container from '@components/ui/container';
import { heroAd1, heroAd2 } from '@framework/basic-rest/static/ads';
import { HeroBannerCurated as heroBanner } from '@framework/basic-rest/static/banner';
import { GetStaticProps } from 'next';

export default function Home() {
  return (
    <>
      <Seo
        title='Grocery & Food Store React Template'
        description='Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS.'
        path='/'
      />
      <div className='mt-10 mb-10 hidden md:block '>
        <HeroBanner banner={heroBanner} />
      </div>
      <div className='mt-6 mb-10 sm:mt-20 md:hidden '>
        <HeroBannerMobile banner={heroBanner} />
      </div>
      <div className='mb-16'>
        <HomepageAd ad1={heroAd1} ad2={heroAd2} />
      </div>

      <Container>
        <ProductGrid sectionHeadingTitle={'Some of Our Favourites'} />
      </Container>

      <div className='mt-10'>
        <HaveBrandLexir />
      </div>
    </>
  );
}

Home.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {},
  };
};
