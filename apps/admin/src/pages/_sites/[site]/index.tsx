import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';

import AppLayout from '@components/layouts/app';

import {
  allowedRoles,
  getAuthCredentials,
  hasAccess,
  isAuthenticated,
} from '@utils/auth-utils';
import { ADMIN, BRAND, SUPER_ADMIN } from '@utils/constants';
import { ROUTES } from '@utils/routes';

const AdminDashboard = dynamic(() => import('@components/dashboard/admin'));

const OwnerDashboard = dynamic(() => import('@components/dashboard/owner'));
export default function Dashboard({
  userPermissions,
}: {
  userPermissions: string[];
}) {
  if (
    userPermissions?.includes(SUPER_ADMIN) ||
    userPermissions?.includes(ADMIN) ||
    userPermissions?.includes(BRAND)
  ) {
    return <AdminDashboard />;
  }
  return <OwnerDashboard />;
}

Dashboard.Layout = AppLayout;

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale } = ctx;
  // console.log(ctx.query.site);

  const { token, permissions } = getAuthCredentials(ctx);

  console.log(isAuthenticated({ token, permissions }));

  if (
    !isAuthenticated({ token, permissions }) ||
    !hasAccess(allowedRoles, permissions)
  ) {
    return {
      redirect: {
        destination: ROUTES.LOGIN,
        permanent: false,
      },
    };
  }

  if (locale) {
    return {
      props: {
        userPermissions: permissions,
      },
    };
  }

  return {
    props: {
      userPermissions: permissions,
    },
  };
};
