import CategoryDropdownSidebar from '@components/category/category-dropdown-sidebar';
import DownloadAppsTwo from '@components/common/download-apps-two';
import RefinedSidebar from '@components/common/refined-sidebar';
import HeroCarouselBlock from '@components/hero/hero-carousel-block';
import Layout from '@components/layout/layout-six';
import RefinedAllProductFeed from '@components/product/feeds/refined-all-products-feed';
import Seo from '@components/seo/seo';
import Container from '@components/ui/container';
import { fetchCategories } from '@framework/basic-rest/category/get-all-categories';
import { fetchProducts } from '@framework/basic-rest/product/get-all-products';
import { refinedSixHeroBanner as heroBanner } from '@framework/basic-rest/static/banner';
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
        title='Refined'
        description='Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS.'
        path='refined'
      />

      <Container>
        <HeroCarouselBlock heroBanner={heroBanner} />
        <Element name='grid' className='flex flex-col mb-16 md:flex-row'>
          <CategoryDropdownSidebar className='shrink-0 ltr:pr-8 rtl:pl-8 xl:ltr:pr-10 xl:rtl:pl-10 hidden xl:block w-[350px] 2xl:w-96 lg:sticky lg:top-20' />
          <RefinedAllProductFeed className='w-full xl:ltr:-ml-3 xl:rtl:-mr-3 3xl:ltr:-ml-1 3xl:rtl:-mr-1 3xl:ltr:pr-2 3xl:rtl:pl-2' />
          <RefinedSidebar className='w-full md:w-[300px] lg:w-[350px] mt-10 md:mt-0 md:sticky md:top-16 lg:top-20' />
        </Element>
      </Container>
      <DownloadAppsTwo />
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
