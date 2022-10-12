import { useState } from 'react';

import PageHeader from '@components/atoms/pageHeader';
import ErrorMessage from '@components/ui/error-message';

import { getSubdomain } from '@utils/request-utils';

import { useAnalyticsQuery } from '@data/analytics/use-analytics.query';
import { useOrdersQuery } from '@data/order/use-orders.query';

import DashboardB2bB2cChart from './dashboard-b2b-B2C-chart';
import DashboardSalesHistoryChart from './dashboard-sales-history';
import DashboardTopAccounts from './dashboard-top-accounts';
import DashboardTopProductsSalesBarChart from './dashboard-top-products-sales-bar';
import Widgets from './dashboard-widgets';

export default function Dashboard() {
  const { subdomain: subdomain } = getSubdomain();

  const [productSalesHistoryToggle, setProductSalesHistoryToggle] =
    useState(false);
  const [productSalesToggle, setProductSalesToggle] = useState(false);
  const [b2cVsB2bToggle, setB2cVsB2bToggle] = useState(false);

  const { data } = useAnalyticsQuery();

  const {
    data: orderData,
    isLoading: orderLoading,
    error: orderError,
  } = useOrdersQuery({
    subdomain: subdomain,
    limit: 10,
    page: 1,
  });

  if (orderError) {
    return <ErrorMessage message={orderError?.message} />;
  }

  let isTotalYearSaleByMonthMoreThanThree = 0;

  let salesByYear: number[] = Array.from({ length: 12 }, (_) => 0);

  if (data?.totalYearSaleByMonth?.length) {
    data.totalYearSaleByMonth.some(function (saleByMonth) {
      if (saleByMonth?.total != 0) isTotalYearSaleByMonthMoreThanThree++;
      return null;
    });
    salesByYear = data.totalYearSaleByMonth.map((item: any) =>
      item.total.toFixed(2)
    );
  }

  return (
    <>
      <div className='mb-4 bg-[#F9F9F9] lg:sticky lg:top-[72px] lg:z-[800] lg:w-full lg:border-b-2 lg:border-l-2 lg:border-gray-100 lg:px-4'>
        <PageHeader
          title='Dashboard'
          subtitle={`Here's your brand's sales summary and breakdown`}
          datepicker={false}
        />
      </div>
      <div className='mb-6 grid w-full grid-cols-1 gap-5 sm:grid-cols-3 lg:mt-6 lg:px-4 xl:grid-cols-3'>
        <Widgets />
      </div>

      <div className='mb-6 flex w-full flex-wrap lg:px-4'>
        <DashboardSalesHistoryChart
          isLabelEnabled
          title={
            productSalesHistoryToggle ? 'Bottles History' : 'Sales History'
          }
          subtitle=''
          colors={['RGBA(133, 205, 180, 1)', 'RGBA(133, 205, 180, 1)']}
          isBottles
          serieName={productSalesHistoryToggle ? 'Bottles' : 'Sales'}
          toggle={productSalesHistoryToggle}
          setToggle={setProductSalesHistoryToggle}
        />
      </div>

      <div className='lg:px-4'>
        <DashboardTopProductsSalesBarChart
          title='Top Products'
          subtitle=''
          colors={['RGBA(133, 205, 180, 1)', 'RGBA(133, 205, 180, 1)']}
          label={productSalesToggle ? 'Bottles' : 'Sales'}
          toggle={productSalesToggle}
          setToggle={setProductSalesToggle}
        />
      </div>

      <div className='flex flex-col gap-0 sm:flex-row sm:gap-4 lg:px-4 lg:pb-4'>
        <DashboardB2bB2cChart
          title='B2B vs B2C'
          subtitle=''
          isSales={false}
          isBottles={true}
          b2cVsB2bToggle={b2cVsB2bToggle}
          setB2cVsB2bToggle={setB2cVsB2bToggle}
        />

        <DashboardTopAccounts title='Top Accounts' subtitle='' />
      </div>
    </>
  );
}
