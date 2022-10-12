import { useState } from 'react';

import type { GetServerSideProps } from 'next';

import PageHeader from '@components/atoms/pageHeader';
import Customercard from '@components/customer/customer-card';
import Layout from '@components/layouts/admin';
import EmptyPayout from '@components/payouts/empty-payout';
import PayoutsList from '@components/payouts/payout-list';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';

import {
  getAuthCredentials,
  hasAccess,
  superAdminAndAdminAndBrandOnly,
  superAdminOnly,
} from '@utils/auth-utils';
import { getSubdomain } from '@utils/request-utils';

import { usePayoutQuery } from '@data/payouts/use-payouts.query';
import { SortOrder } from '@ts-types/generated';

export default function Payouts() {
  const { subdomain: subdomain } = getSubdomain();
  const { permissions: currentUserPermissions } = getAuthCredentials();
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState('created_at');
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);

  const {
    data,
    isLoading: loading,
    error,
  } = usePayoutQuery({
    subdomain: subdomain,
  });

  if (loading) return <Loader text='Loading' />;
  if (error) return <ErrorMessage message={error.message} />;

  function handlePagination(current: any) {
    setPage(current);
  }

  return (
    <>
      <div className='mb-4 bg-[#F9F9F9] lg:sticky lg:top-[72px] lg:z-[30] lg:w-full lg:border-b-2 lg:border-l-2 lg:border-gray-100 lg:px-4'>
        <PageHeader
          title='Payouts'
          subtitle={`View your payout reports for this market`}
          datepicker={false}
          addButton={
            hasAccess(superAdminOnly, currentUserPermissions)
              ? {
                  title: 'Upload New Report',
                  href: '/payouts/create',
                }
              : null
          }
        />
      </div>
      <div className='lg:mt-6 lg:px-4'>
        {data.payouts.data.length > 0 ? (
          <>
            <div className='hidden md:block'>
              {loading ? null : (
                <PayoutsList
                  payouts={data.payouts.data}
                  onPagination={handlePagination}
                  onOrder={setOrder}
                  onSort={setColumn}
                  title='Payouts List'
                />
              )}
            </div>
            <div className='block lg:hidden'>
              <div className='flex space-x-5'>
                <div className='grid w-full grid-cols-1'>
                  <div className='block md:hidden '>
                    {data?.payouts.data.map((customer: any) => (
                      <Customercard item={customer} key={customer.id} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <EmptyPayout />
        )}
      </div>
    </>
  );
}

Payouts.authenticate = {
  permissions: superAdminAndAdminAndBrandOnly,
};

Payouts.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale, query } = ctx;

  if (locale) {
    return {
      props: {
        subdomain: query.site,
      },
    };
  }

  return {
    props: {
      subdomain: query.site,
    },
  };
};
