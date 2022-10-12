import type { GetStaticPaths } from 'next';

import PageHeader from '@components/atoms/pageHeader';
import EmptyStock from '@components/atoms/stockPage/empty-stock';
import ProductList from '@components/atoms/stockPage/listProductStock';
import Layout from '@components/layouts/admin';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';

import { superAdminAndAdminAndBrandOnly } from '@utils/auth-utils';
import { getSubdomain } from '@utils/request-utils';

import { useStocksQuery } from '@data/stocks/stocks.query';

export default function Stocks() {
  const { subdomain: subdomain } = getSubdomain();

  const {
    data,
    isLoading: loading,
    error,
  } = useStocksQuery({
    subdomain: subdomain,
  });

  if (loading) return <Loader text='Loading' />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <div className='mb-4 bg-[#F9F9F9] lg:sticky lg:top-[72px] lg:z-[30] lg:w-full lg:border-b-2 lg:border-l-2 lg:border-gray-100 lg:px-4'>
        <PageHeader
          title='Stocks'
          subtitle={`Manage the stock balances of your products in this market`}
          datepicker={false}
        />
      </div>

      {data.stocks.data.length > 0 ? (
        <>
          <ProductList
            products={data?.stocks.data}
            totalStock={data.stocks.data.reduce(
              (previousValue: any, currentValue: any) =>
                previousValue + parseInt(currentValue.quantity),
              0
            )}
          />
        </>
      ) : (
        <EmptyStock />
      )}
    </>
  );
}

Stocks.authenticate = {
  permissions: superAdminAndAdminAndBrandOnly,
};
Stocks.Layout = Layout;

export const getStaticProps = async () => ({
  props: {},
});

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};
