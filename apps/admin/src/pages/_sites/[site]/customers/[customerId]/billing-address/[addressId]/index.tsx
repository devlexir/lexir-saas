import { useRouter } from 'next/router';

import UpdateCustomerBillingAddressForm from '@components/form/customers/customer-update-billing-address-form';
import Layout from '@components/layouts/admin';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';

import { useCustomerBillingAddressQuery } from '@data/customer/use-customer-billing.query';

const EditBilling = () => {
  const { query } = useRouter();
  const {
    data,
    isLoading: loading,
    error,
  } = useCustomerBillingAddressQuery(
    query.customerId as string,
    query.addressId as string
  );

  if (loading) return <Loader text='Loading' />;
  if (error) return <ErrorMessage message={error?.message as string} />;
  return (
    <>
      <UpdateCustomerBillingAddressForm initialValues={data} />
    </>
  );
};
EditBilling.Layout = Layout;

export default EditBilling;

export const getServerSideProps = async () => ({
  props: {},
});
