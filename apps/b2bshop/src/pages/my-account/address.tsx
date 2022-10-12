import Layout from '@components/layout/layout';
import AccountLayout from '@components/my-account/account-layout';
import Seo from '@components/seo/seo';
import { useAddressQuery } from '@framework/basic-rest/address/address';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function AccountDetailsPage() {
  let { data, isLoading } = useAddressQuery();
  return (
    <>
      <Seo
        title='Address'
        description='Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS.'
        path='my-account/address'
      />
      <AccountLayout>
        {!isLoading ? (
          <AddressGrid address={data?.data} />
        ) : (
          <div>Loading...</div>
        )}
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
        'terms',
        'faq',
        'footer',
      ])),
    },
  };
};
