import Layout from '@components/layout/layout';
import AccountLayout from '@components/my-account/account-layout';
import OrderTable from '@components/order/order-table';
import Seo from '@components/seo/seo';
import { useOrdersQuery } from '@framework/basic-rest/order/get-all-orders';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

export default function OrdersTablePage() {
  const { data, isLoading } = useOrdersQuery({});
  return (
    <>
      <Seo
        title='Orders'
        description='Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS.'
        path='my-account/orders'
      />
      <AccountLayout>
        {!isLoading ? (
          <OrderTable orders={data?.data} />
        ) : (
          <div>Loading...</div>
        )}
      </AccountLayout>
    </>
  );
}

OrdersTablePage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
  };
};
