import { useState } from 'react';

import type { GetServerSideProps } from 'next';

import { useAtom } from 'jotai';

import PageHeader from '@components/atoms/pageHeader';
import Layout from '@components/layouts/admin';
import EmptyOrder from '@components/order/components/empty-order';
import OrderCard from '@components/order/order-card';
import OrderList from '@components/order/order-list';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';

import {
  getAuthCredentials,
  hasAccess,
  superAdminAndAdminAndBrandOnly,
  superAdminOnly,
} from '@utils/auth-utils';
import { getSubdomain } from '@utils/request-utils';

import { startDateAtom } from '@contexts/dashboard';
import { endDateAtom } from '@contexts/dashboard';
import {
  customerFilterOrderAtom,
  customerTypeFilterOrderAtom,
  orderDateEndFilterOrderAtom,
  orderDateStartFilterOrderAtom,
  orderIdFilterOrderAtom,
  orderValueMaxFilterOrderAtom,
  orderValueMinFilterOrderAtom,
} from '@contexts/filters';
import { useOrdersQuery } from '@data/order/use-orders.query';
import { SortOrder } from '@ts-types/generated';

export default function Orders() {
  const { permissions: currentUserPermissions } = getAuthCredentials();

  const { subdomain: subdomain } = getSubdomain();

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState('created_at');
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);

  // ** States for Fitlers ** //
  const [orderIdFilterOrder] = useAtom(orderIdFilterOrderAtom);
  const [customerFilterOrder] = useAtom(customerFilterOrderAtom);
  const [customerTypeFilterOrder] = useAtom(customerTypeFilterOrderAtom);
  const [orderValueMinFilterOrder] = useAtom(orderValueMinFilterOrderAtom);
  const [orderValueMaxFilterOrder] = useAtom(orderValueMaxFilterOrderAtom);
  const [orderDateStartFilterOrder] = useAtom(orderDateStartFilterOrderAtom);
  const [orderDateEndFilterOrder] = useAtom(orderDateEndFilterOrderAtom);

  const [startDate] = useAtom(startDateAtom);
  const [endDate] = useAtom(endDateAtom);

  const {
    data,
    isLoading: loading,
    error,
  } = useOrdersQuery({
    subdomain: subdomain,
    limit: 20,
    page,
    text: searchTerm,
    startDate: startDate.toString(),
    endDate: endDate.toString(),
    orderIdFilterOrder: orderIdFilterOrder,
    customerFilterOrder: customerFilterOrder,
    customerTypeFilterOrder: customerTypeFilterOrder,
    orderValueMinFilterOrder: orderValueMinFilterOrder,
    orderValueMaxFilterOrder: orderValueMaxFilterOrder,
    orderDateStartFilterOrder: orderDateStartFilterOrder,
    orderDateEndFilterOrder: orderDateEndFilterOrder,
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
          title='Orders'
          subtitle='Manage your orders in this Market'
          datepicker={false}
          addButton={
            hasAccess(superAdminOnly, currentUserPermissions)
              ? { href: '/orders/create', title: '+ NEW ORDER' }
              : null
          }
        />
      </div>

      {/* <OffCanvas /> */}
      <div className='lg:mt-6 lg:px-4'>
        {data.orders.data.length > 0 ? (
          <>
            <div className='hidden md:block'>
              <OrderList
                orders={data?.orders}
                onPagination={handlePagination}
                onOrder={setOrder}
                onSort={setColumn}
              />
            </div>
            <div className='block md:hidden'>
              <div className='flex space-x-5'>
                <div className='grid w-full grid-cols-1'>
                  <div className='block md:hidden '>
                    {data?.orders?.data.map((order: any) => (
                      <OrderCard order={order} key={order.id} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <EmptyOrder />
        )}
      </div>
    </>
  );
}

Orders.authenticate = {
  permissions: superAdminAndAdminAndBrandOnly,
};
Orders.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale, query } = ctx;

  if (locale) {
    return {
      props: {
        ////...(await serverSideTranslations(locale, ["form", "common", "table"])),
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
