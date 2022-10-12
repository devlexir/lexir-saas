import type { GetServerSideProps } from 'next';

import CreateProductForm from '@components/form/products/product-create-form';
import Layout from '@components/layouts/admin';

import { getAuthCredentials } from '@utils/auth-utils';

export default function UpdateProductPage(pageProps: any) {
  return (
    <>
      <CreateProductForm
        subdomain={pageProps.subdomain}
        pageTitle='Products'
        pageSubTitle='Create a new product'
      />
    </>
  );
}
UpdateProductPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale, query } = ctx;

  const { permissions } = getAuthCredentials(ctx);

  if (locale) {
    return {
      props: {
        subdomain: query.site,
        userPermissions: permissions,
      },
    };
  }

  return {
    props: {
      subdomain: query.site,
      userPermissions: permissions,
    },
  };
};
