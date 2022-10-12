import type { GetServerSideProps } from 'next';

import CreateCustomerForm from '@components/form/customers/customer-create-form';
import Layout from '@components/layouts/admin';

export default function CreateCustomerPage(pageProps: any) {
  return (
    <>
      <CreateCustomerForm subdomain={pageProps.subdomain} />
    </>
  );
}
CreateCustomerPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx;

  return {
    props: {
      subdomain: query.site,
    },
  };
};
