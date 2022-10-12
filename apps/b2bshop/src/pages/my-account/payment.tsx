import Layout from '@components/layout/layout';
import AccountLayout from '@components/my-account/account-layout';
import PaymentBox from '@components/payment/payment-content';
import Seo from '@components/seo/seo';
import { usePaymentQuery } from '@framework/basic-rest/payment/payment';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function AccountDetailsPage() {
  let { data, isLoading } = usePaymentQuery();
  return (
    <>
      <Seo
        title='Payment'
        description='Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS.'
        path='my-account/payment'
      />
      <AccountLayout>
        {!isLoading ? <PaymentBox items={data?.data} /> : <div>Loading...</div>}
      </AccountLayout>
    </>
  );
}

AccountDetailsPage.Layout = Layout;

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
