import BundleHeroSection from '@components/bundle/bundle-hero-section';
import BannerGridTwo from '@components/common/banner-grid-two';
import DownloadApps from '@components/common/download-apps';
import Layout from '@components/layout/layout';
import ProductBundleGrid from '@components/product/product-bundle-grid';
import Container from '@components/ui/container';
import { bannerGridTwo as banners } from '@framework/basic-rest/static/banner';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Bundles() {
  return (
    <>
      <BundleHeroSection />
      <Container>
        <ProductBundleGrid
          className='mt-7 md:mt-8 xl:mt-10 pb-20'
          element={<BannerGridTwo data={banners} className='py-5' />}
        />
      </Container>
      <DownloadApps />
    </>
  );
}

Bundles.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
  };
};
