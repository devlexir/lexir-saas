/* General Atoms */
import { useState } from 'react';

import type { GetServerSideProps } from 'next';

import PageHeader from '@components/atoms/pageHeader';
import Customercard from '@components/customer/customer-card';
import CustomerList from '@components/customer/customer-list';
import EmptyCustomer from '@components/customer/empty-customer';
import Layout from '@components/layouts/admin';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';

import {
  getAuthCredentials,
  hasAccess,
  superAdminAndAdminAndBrandOnly,
  superAdminOnly,
} from '@utils/auth-utils';
import { getSubdomain } from '@utils/request-utils';

import { useCustomersQuery } from '@data/customer/use-customers.query';
import { SortOrder } from '@ts-types/generated';

export default function Customers() {
  const { permissions: currentUserPermissions } = getAuthCredentials();
  const { subdomain: subdomain } = getSubdomain();

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState('created_at');
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);

  // ** States for Fitlers ** //

  const {
    data,
    isLoading: loading,
    error,
  } = useCustomersQuery({
    subdomain: subdomain,
    limit: 20,
    page,
    text: searchTerm,
    orderBy,
    sortedBy,
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
          title='Customers'
          subtitle={`Browse your brand's customers`}
          datepicker={false}
          addButton={
            hasAccess(superAdminOnly, currentUserPermissions)
              ? {
                  title: '+ NEW customer',
                  href: '/customers/create',
                }
              : null
          }
        />
      </div>
      <div className='lg:mt-6 lg:px-4'>
        {data.customers.data.length > 0 ? (
          <>
            <div className='hidden md:block'>
              {loading ? null : (
                <CustomerList
                  customers={data?.customers}
                  onPagination={handlePagination}
                  onOrder={setOrder}
                  onSort={setColumn}
                  title='Customers List'
                />
              )}
            </div>
            <div className='block lg:hidden'>
              <div className='flex space-x-5'>
                <div className='grid w-full grid-cols-1'>
                  <div className='block md:hidden '>
                    {data?.customers?.data.map((customer: any) => (
                      <Customercard item={customer} key={customer.id} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <EmptyCustomer />
        )}
      </div>
    </>
  );
}

Customers.authenticate = {
  permissions: superAdminAndAdminAndBrandOnly,
};

Customers.Layout = Layout;

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
