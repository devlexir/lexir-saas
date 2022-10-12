import Layout from '@components/layout/layout';
import OrderInformation from '@components/order/order-information';
import Seo from '@components/seo/seo';
import Container from '@components/ui/container';
import Divider from '@components/ui/divider';
import { useCart } from '@contexts/cart/cart.context';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';

export default function Order() {
  const { resetCart } = useCart();
  useEffect(() => {
    resetCart();
  }, []);
  return (
    <>
      <Seo
        title='Order'
        description='Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS.'
        path='complete-order'
      />
      <Divider />
      <Container>
        <OrderInformation />
      </Container>
      <Divider />
    </>
  );
}

Order.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
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
