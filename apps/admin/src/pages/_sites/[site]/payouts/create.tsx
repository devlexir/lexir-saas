import type { GetServerSideProps } from 'next';

import CreatePayoutForm from '@components/form/payouts/payout-create-form';
import Layout from '@components/layouts/admin';

export default function CreatePayoutPage(pageProps: any) {
  return (
    <>
      <CreatePayoutForm subdomain={pageProps.subdomain} />
    </>
  );
}
CreatePayoutPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx;

  return {
    props: {
      subdomain: query.site,
    },
  };
};
