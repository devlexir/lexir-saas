import { useRouter } from 'next/router';

import UpdateCustomerShippingAddressForm from '@components/form/customers/customer-update-shipping-address-form';
import Layout from '@components/layouts/admin';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';

import { useCustomerShippingAddressQuery } from '@data/customer/use-customer-shipping.query';

const EditShipping = () => {
  const { query } = useRouter();
  const {
    data,
    isLoading: loading,
    error,
  } = useCustomerShippingAddressQuery(
    query.customerId as string,
    query.addressId as string
  );

  if (loading) return <Loader text='Loading' />;
  if (error) return <ErrorMessage message={error?.message as string} />;

  return (
    <>
      <UpdateCustomerShippingAddressForm initialValues={data} />
    </>
  );
};
EditShipping.Layout = Layout;

export default EditShipping;

export const getServerSideProps = async () => ({
  props: {},
});
