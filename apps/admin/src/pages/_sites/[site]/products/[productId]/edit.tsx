import { useRouter } from 'next/router';

import UpdateProductForm from '@components/form/products/product-update-form';
import Layout from '@components/layouts/admin';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';

import { useProductQuery } from '@data/product/product.query';

export default function UpdateProductPage() {
  const { query } = useRouter();
  const {
    data,
    isLoading: loading,
    error,
  } = useProductQuery(query.productId as string);

  if (loading) return <Loader text='Loading' />;
  if (error) return <ErrorMessage message={error?.message as string} />;
  return (
    <>
      <UpdateProductForm
        initialValues={data}
        pageTitle='Products'
        pageSubTitle='Edit Product'
      />
    </>
  );
}
UpdateProductPage.Layout = Layout;

export const getServerSideProps = async () => ({
  props: {},
});
