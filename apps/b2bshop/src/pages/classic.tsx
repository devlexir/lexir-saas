import BannerGridTwo from '@components/common/banner-grid-two';
import CollectionGrid from '@components/common/collection-grid';
import DownloadApps from '@components/common/download-apps';
import FeatureGrid from '@components/common/featured-grid';
import Layout from '@components/layout/layout';
import BestSellerProductFeed from '@components/product/feeds/best-seller-product-feed';
import ChipsProductFeed from '@components/product/feeds/chips-product-feed';
import CookiesProductFeed from '@components/product/feeds/cookies-product-feed';
import FreshVegetablesProductFeed from '@components/product/feeds/fresh-vegetables-product-feed';
import PopcornJerkyProductFeed from '@components/product/feeds/popcorn-jerky-product-feed';
import Seo from '@components/seo/seo';
import Container from '@components/ui/container';
import { fetchBestSellerProducts } from '@framework/basic-rest/product/get-all-best-seller-products';
import { fetchChipsProducts } from '@framework/basic-rest/product/get-all-chips-products';
import { fetchCookiesProducts } from '@framework/basic-rest/product/get-all-cookies-products';
import { fetchFreshVegetablesProducts } from '@framework/basic-rest/product/get-all-fresh-vegetables-products';
import { fetchPopcornJerkyProducts } from '@framework/basic-rest/product/get-all-popcorn-jerky-products';
import { bannerGridTwo as banners } from '@framework/basic-rest/static/banner';
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
        title='Classic'
        description='Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS.'
        path='classic'
      />
      <Container>
        <BannerGridTwo
          data={banners}
          className='my-3 md:my-4 lg:mt-0 lg:mb-5 xl:mb-6'
        />
        <FeatureGrid />
      </Container>
      <BestSellerProductFeed />
      <FreshVegetablesProductFeed />
      <ChipsProductFeed />
      <CollectionGrid className='mb-12 lg:mb-14 xl:mb-16' />
      <CookiesProductFeed />
      <PopcornJerkyProductFeed />
      <DownloadApps />
    </>
  );
}

Home.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    [
      API_ENDPOINTS.BEST_SELLER_PRODUCTS,
      { limit: LIMITS.BEST_SELLER_PRODUCTS_LIMITS },
    ],
    fetchBestSellerProducts
  );
  await queryClient.prefetchQuery(
    [
      API_ENDPOINTS.FRESH_VEGETABLES_PRODUCTS,
      { limit: LIMITS.FRESH_VEGETABLES_PRODUCTS_LIMITS },
    ],
    fetchFreshVegetablesProducts
  );
  await queryClient.prefetchQuery(
    [API_ENDPOINTS.CHIPS_PRODUCTS, { limit: LIMITS.CHIPS_PRODUCTS_LIMITS }],
    fetchChipsProducts
  );
  await queryClient.prefetchQuery(
    [API_ENDPOINTS.COOKIES_PRODUCTS, { limit: LIMITS.COOKIES_PRODUCTS_LIMITS }],
    fetchCookiesProducts
  );
  await queryClient.prefetchQuery(
    [
      API_ENDPOINTS.POPCORN_JERKY_PRODUCTS,
      { limit: LIMITS.POPCORN_JERKY_PRODUCTS_LIMITS },
    ],
    fetchPopcornJerkyProducts
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
