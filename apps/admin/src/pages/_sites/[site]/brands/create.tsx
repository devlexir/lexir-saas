import type { GetServerSideProps } from 'next';

import CreateBrandForm from '@components/form/brands/brand-create-form';
import Layout from '@components/layouts/admin';

export default function CreateBrandPage(pageProps: any) {
  return (
    <>
      <CreateBrandForm subdomain={pageProps.subdomain} />
    </>
  );
}
CreateBrandPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx;

  return {
    props: {
      subdomain: query.site,
    },
  };
};
