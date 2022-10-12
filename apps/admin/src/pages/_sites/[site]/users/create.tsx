import type { GetServerSideProps } from 'next';

import CreateUserForm from '@components/form/users/user-create-form';
import Layout from '@components/layouts/admin';

export default function CreateUserPage(pageProps: any) {
  return (
    <>
      <CreateUserForm subdomain={pageProps.subdomain} />
    </>
  );
}
CreateUserPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx;

  return {
    props: {
      subdomain: query.site,
    },
  };
};
