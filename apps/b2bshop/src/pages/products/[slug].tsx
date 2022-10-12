import Container from '@components/ui/container';
import Layout from '@components/layout/layout';
import ProductSingleDetails from '@components/product/product';
import Breadcrumb from '@components/ui/breadcrumb';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import Divider from '@components/ui/divider';
import HaveBrandLexir from '@components/common/have-brand-lexir.tsx';

export default function ProductPage() {
  return (
    <>
      <Divider />
      <div className='pt-8 lg:pt-10'>
        <Container>
          <Breadcrumb />
          <ProductSingleDetails />
        </Container>
      </div>
      <div className='mt-10'>
        <HaveBrandLexir />
      </div>
    </>
  );
}

ProductPage.Layout = Layout;

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
