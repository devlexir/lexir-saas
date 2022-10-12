import { useRouter } from 'next/router';

import UpdateUserForm from '@components/form/users/user-edit-form ';
import Layout from '@components/layouts/admin';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';

import { useUserQuery } from '@data/users/use-user.query';

export default function UpdateUserPage() {
  const { query } = useRouter();
  const { data, isLoading: loading, error } = useUserQuery(query.id as string);

  if (loading) return <Loader text='Loading' />;
  if (error) return <ErrorMessage message={error?.message as string} />;

  return (
    <>
      <UpdateUserForm initialValues={data} />
    </>
  );
}
UpdateUserPage.Layout = Layout;

export const getServerSideProps = async () => ({
  props: {},
});
