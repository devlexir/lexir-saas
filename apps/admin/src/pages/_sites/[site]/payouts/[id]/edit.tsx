import { useRouter } from 'next/router';

import EditPayoutForm from '@components/form/payouts/payout-edit-form ';
import Layout from '@components/layouts/admin';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';

import { usePayoutQuery } from '@data/payouts/use-payout.query';

export default function UpdatePayoutPage() {
  const { query } = useRouter();
  const {
    data,
    isLoading: loading,
    error,
  } = usePayoutQuery(query.id as string);

  if (loading) return <Loader text='Loading' />;
  if (error) return <ErrorMessage message={error?.message as string} />;

  return (
    <>
      <EditPayoutForm initialValues={data} />
    </>
  );
}
UpdatePayoutPage.Layout = Layout;

export const getServerSideProps = async () => ({
  props: {},
});
