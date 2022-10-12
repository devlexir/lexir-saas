import HaveBrandLexir from '@components/common/have-brand-lexir.tsx';
import Layout from '@components/layout/layout';
import BrandsPageContent from '@components/shops/brands-page-content';
import PageHeroSection from '@components/ui/page-hero-section';
import { fetchShops } from '@framework/basic-rest/shop/get-shops';
import { API_ENDPOINTS } from '@framework/basic-rest/utils/api-endpoints';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

export default function BrandsPage() {
  return (
    <>
      <PageHeroSection
        backgroundThumbnail='/assets/images/all-brands-hero-image.png'
        mobileBackgroundThumbnail='/assets/images/all-brands-hero-image.png'
        variant='white'
      />
      <BrandsPageContent />
      <div className='mt-10'>
        <HaveBrandLexir />
      </div>
    </>
  );
}

BrandsPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    [API_ENDPOINTS.SHOPS, { limit: 6 }],
    fetchShops
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
