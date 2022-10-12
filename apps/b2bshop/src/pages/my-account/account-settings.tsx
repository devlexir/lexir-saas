import Layout from '@components/layout/layout';
import AccountDetails from '@components/my-account/account-details';
import AccountLayout from '@components/my-account/account-layout';
import Seo from '@components/seo/seo';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function AccountDetailsPage() {
  return (
    <>
      <Seo title='Account Settings' path='my-account/account-settings' />
      <AccountLayout>
        <AccountDetails />
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
