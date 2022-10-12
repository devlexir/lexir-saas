import type { GetServerSideProps } from 'next';

import CreateCustomerBillingForm from '@components/form/customers/customer-create-billing-form';
import Layout from '@components/layouts/admin';

export default function CreateCustomerBillingPage(pageProps: any) {
  return (
    <>
      <CreateCustomerBillingForm subdomain={pageProps.subdomain} />
    </>
  );
}
CreateCustomerBillingPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx;

  return {
    props: {
      subdomain: query.site,
    },
  };
};
