import { ADMIN, SUPER_ADMIN, BRAND } from '@utils/constants';
import dynamic from 'next/dynamic';

const AdminLayout = dynamic(() => import('@components/layouts/admin'));
const OwnerLayout = dynamic(() => import('@components/layouts/owner'));

export default function AppLayout({
  userPermissions,
  ...props
}: {
  userPermissions: string[];
}) {
  if (
    userPermissions?.includes(SUPER_ADMIN) ||
    userPermissions?.includes(ADMIN) ||
    userPermissions?.includes(BRAND)
  ) {
    return <AdminLayout {...props} />;
  }
  return <OwnerLayout {...props} />;
}
