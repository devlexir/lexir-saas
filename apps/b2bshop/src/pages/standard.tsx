import BundleGrid from '@components/bundle/bundle-grid';
import BannerGrid from '@components/common/banner-grid';
import CategoryGridListBlock from '@components/common/category-grid-list-block';
import CollectionGrid from '@components/common/collection-grid';
import DownloadApps from '@components/common/download-apps';
import HeroBannerCard from '@components/hero/hero-banner-card';
import Layout from '@components/layout/layout-two';
import BestSellerGroceryProductFeed from '@components/product/feeds/best-seller-grocery-product-feed';
import PopularProductFeed from '@components/product/feeds/popular-product-feed';
import Seo from '@components/seo/seo';
import Container from '@components/ui/container';
import { fetchCategories } from '@framework/basic-rest/category/get-all-categories';
import { fetchBestSellerGroceryProducts } from '@framework/basic-rest/product/get-all-best-seller-grocery-products';
import { fetchPopularProducts } from '@framework/basic-rest/product/get-all-popular-products';
import { bannerGridThree as banners } from '@framework/basic-rest/static/banner';
import { homeThreeHeroBanner as heroBanner } from '@framework/basic-rest/static/banner';
import { bundleDataTwo as bundle } from '@framework/basic-rest/static/bundle';
import { API_ENDPOINTS } from '@framework/basic-rest/utils/api-endpoints';
import { LIMITS } from '@framework/basic-rest/utils/limits';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

export default function Home() {
  return (
    <>
      <Seo
        title='Standard'
        description='Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS.'
        path='standard'
      />
      <HeroBannerCard
        banner={heroBanner}
        className='min-h-[400px] md:min-h-[460px] lg:min-h-[500px] xl:min-h-[550px] 2xl:min-h-[650px] py-20 py:pt-24 mb-5'
      />
      <Container>
        <BundleGrid
          data={bundle}
          className='mb-12 lg:mb-14 xl:mb-16 2xl:mb-20'
        />
        <CategoryGridListBlock />
        <BestSellerGroceryProductFeed />
        <BannerGrid
          data={banners}
          className='mb-12 lg:mb-14 xl:mb-16 2xl:mb-20'
        />
        <PopularProductFeed />
      </Container>
      <CollectionGrid
        headingPosition='center'
        className='mb-12 pb-1 lg:pb-0 lg:mb-14 xl:mb-16 2xl:pt-4'
      />
      <DownloadApps />
    </>
  );
}

Home.Layout = Layout;

Home.Layout = Layout;
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    [API_ENDPOINTS.CATEGORIES, { limit: LIMITS.CATEGORIES_LIMITS }],
    fetchCategories
  );
  await queryClient.prefetchQuery(
    [
      API_ENDPOINTS.BEST_SELLER_GROCERY_PRODUCTS,
      { limit: LIMITS.BEST_SELLER_GROCERY_PRODUCTS_LIMITS },
    ],
    fetchBestSellerGroceryProducts
  );
  await queryClient.prefetchQuery(
    [API_ENDPOINTS.POPULAR_PRODUCTS, { limit: LIMITS.POPULAR_PRODUCTS_LIMITS }],
    fetchPopularProducts
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
