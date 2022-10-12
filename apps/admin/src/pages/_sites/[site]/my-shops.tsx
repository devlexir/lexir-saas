import type { GetStaticPaths } from 'next';
import { GetStaticProps } from 'next';

import OwnerDashboard from '@components/dashboard/owner';
import AdminLayout from '@components/layouts/admin';

import { adminOnly } from '@utils/auth-utils';

export const getStaticProps: GetStaticProps = async () => ({
  props: {},
});
const MyShopsPage = () => {
  return <OwnerDashboard />;
};

MyShopsPage.authenticate = {
  permissions: adminOnly,
};
MyShopsPage.Layout = AdminLayout;
export default MyShopsPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};
