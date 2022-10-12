import { useAtom } from 'jotai';

import { useSSE } from 'use-sse';

import ColummChartBottles from '@components/widgets/column-chart-bottles';
import ColummChartSales from '@components/widgets/column-chart-sales';

import { API_ENDPOINTS } from '@utils/api/endpoints';
import { getSubdomain } from '@utils/request-utils';

import { startDateAtom } from '@contexts/dashboard';
import { endDateAtom } from '@contexts/dashboard';

const DashboardSalesHistoryChart = ({
  title,
  subtitle,
  colors,
  isLabelEnabled,

  serieName,
  toggle,
  setToggle,
}: any) => {
  const [startDate] = useAtom(startDateAtom);
  const [endDate] = useAtom(endDateAtom);

  const { subdomain: subdomain } = getSubdomain();

  const [salesHistoryData] = useSSE(() => {
    return fetch(
      `${process.env.NEXT_PUBLIC_NEW_REST_API_ENDPOINT}/${API_ENDPOINTS.DASHBOARD_SALES_HISTORY}?subdomain=${subdomain}&startDate=${startDate}&endDate=${endDate}`
    ).then((res) => res.json());
  }, [startDate, endDate]);

  return (
    <div className='mb-2 flex w-full flex-wrap rounded-lg border border-[#E7E7E7]'>
      {toggle ? (
        <ColummChartBottles
          isLabelEnabled={isLabelEnabled}
          widgetTitle={title}
          widgetSubtitle={subtitle}
          colors={colors}
          toggle={toggle}
          setToggle={setToggle}
          series={salesHistoryData?.orders?.bottles}
          serieName={serieName}
        />
      ) : (
        <ColummChartSales
          isLabelEnabled={isLabelEnabled}
          widgetTitle={title}
          widgetSubtitle={subtitle}
          colors={colors}
          toggle={toggle}
          setToggle={setToggle}
          series={salesHistoryData?.orders?.sales}
          serieName={serieName}
        />
      )}
    </div>
  );
};

export default DashboardSalesHistoryChart;
