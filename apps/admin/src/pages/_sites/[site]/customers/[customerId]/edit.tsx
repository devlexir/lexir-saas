import { useRouter } from 'next/router';

import UpdateCustomerForm from '@components/form/customers/customer-update-form';
import Layout from '@components/layouts/admin';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';

import { useCustomerQuery } from '@data/customer/use-customer.query';

export default function UpdateProductPage() {
  const { query } = useRouter();
  const {
    data,
    isLoading: loading,
    error,
  } = useCustomerQuery(query.customerId as string);

  if (loading) return <Loader text='Loading' />;
  if (error) return <ErrorMessage message={error?.message as string} />;

  return (
    <>
      <UpdateCustomerForm initialValues={data} />
    </>
  );
}
UpdateProductPage.Layout = Layout;

export const getServerSideProps = async () => ({
  props: {},
});
