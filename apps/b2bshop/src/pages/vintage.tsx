import BundleGrid from '@components/bundle/bundle-grid';
import BannerCard from '@components/cards/banner-card';
import CategoryDropdownSidebar from '@components/category/category-dropdown-sidebar';
import DownloadApps from '@components/common/download-apps';
import HeroSliderBlock from '@components/hero/hero-slider-block';
import Layout from '@components/layout/layout';
import AllProductFeed from '@components/product/feeds/all-products-feed';
import Seo from '@components/seo/seo';
import Container from '@components/ui/container';
import { fetchCategories } from '@framework/basic-rest/category/get-all-categories';
import { fetchProducts } from '@framework/basic-rest/product/get-all-products';
import { homeTwoHeroBanner as heroBanner } from '@framework/basic-rest/static/banner';
import { homeTwoBanner as banner } from '@framework/basic-rest/static/banner';
import { bundleDataTwo as bundle } from '@framework/basic-rest/static/bundle';
import { API_ENDPOINTS } from '@framework/basic-rest/utils/api-endpoints';
import { LIMITS } from '@framework/basic-rest/utils/limits';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { Element } from 'react-scroll';

export default function Home() {
  return (
    <>
      <Seo
        title='Vintage'
        description='Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS.'
        path='vintage'
      />
      <HeroSliderBlock
        heroBanner={heroBanner}
        contentClassName='pb-24 xl:pb-32 pt-16 xl:pt-24'
      />
      <Container>
        <BundleGrid data={bundle} />
        <Element name='grid' className='flex mb-16 pb-2.5'>
          <CategoryDropdownSidebar className='shrink-0 ltr:pr-8 rtl:pl-8 hidden lg:block w-80 xl:w-[370px] lg:sticky lg:top-20' />
          <AllProductFeed
            className='w-full'
            element={<BannerCard banner={banner} className='py-5' />}
          />
        </Element>
      </Container>
      <DownloadApps />
    </>
  );
}

Home.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    [API_ENDPOINTS.CATEGORIES, { limit: LIMITS.CATEGORIES_LIMITS }],
    fetchCategories
  );
  await queryClient.prefetchQuery(
    [API_ENDPOINTS.PRODUCTS, { limit: LIMITS.PRODUCTS_LIMITS }],
    fetchProducts
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
    revalidate: 60,
  };
};
