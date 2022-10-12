import type { GetServerSideProps } from 'next';

import CreateCustomerShippingForm from '@components/form/customers/customer-create-shipping-form';
import Layout from '@components/layouts/admin';

export default function CreateCustomerShippingPage(pageProps: any) {
  return (
    <>
      <CreateCustomerShippingForm subdomain={pageProps.subdomain} />
    </>
  );
}
CreateCustomerShippingPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx;

  return {
    props: {
      subdomain: query.site,
    },
  };
};
