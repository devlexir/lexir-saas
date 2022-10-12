import { useRouter } from 'next/router';

import UpdateBrandForm from '@components/form/brands/brand-edit-form ';
import Layout from '@components/layouts/admin';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';

import { useBrandQuery } from '@data/brand/use-brand.query';

export default function UpdateBrandPage() {
  const { query } = useRouter();

  const { data, isLoading: loading, error } = useBrandQuery(query.id as string);

  if (loading) return <Loader text='Loading' />;
  if (error) return <ErrorMessage message={error?.message as string} />;

  return (
    <>
      <UpdateBrandForm initialValues={data} />
    </>
  );
}
UpdateBrandPage.Layout = Layout;

export const getServerSideProps = async () => ({
  props: {},
});
