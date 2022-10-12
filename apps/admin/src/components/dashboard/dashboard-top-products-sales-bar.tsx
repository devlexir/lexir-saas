import { useAtom } from 'jotai';

import { useSSE } from 'use-sse';

import BarChartBottles from '@components/widgets/bar-chart-bottles';
import BarChartSales from '@components/widgets/bar-chart-sales';

import { API_ENDPOINTS } from '@utils/api/endpoints';
import { getSubdomain } from '@utils/request-utils';

import { startDateAtom } from '@contexts/dashboard';
import { endDateAtom } from '@contexts/dashboard';

const DashboardTopProductsSalesBarChart = ({
  title,
  subtitle,
  colors,
  toggle,
  setToggle,
  label,
}: any) => {
  const [startDate] = useAtom(startDateAtom);
  const [endDate] = useAtom(endDateAtom);

  const { subdomain: subdomain } = getSubdomain();

  const [topProductsData] = useSSE(() => {
    return fetch(
      `${process.env.NEXT_PUBLIC_NEW_REST_API_ENDPOINT}/${API_ENDPOINTS.DASHBOARD_TOP_PRODUCTS}?subdomain=${subdomain}&startDate=${startDate}&endDate=${endDate}`
    ).then((res) => res.json());
  }, [startDate, endDate]);

  return topProductsData && topProductsData.sales.length > 1 ? (
    <div className='mb-6 flex w-full flex-wrap rounded-lg border border-[#E7E7E7]'>
      {toggle ? (
        <BarChartBottles
          widgetTitle={title}
          widgetSubtitle={subtitle}
          label={label}
          colors={colors}
          toggle={toggle}
          setToggle={setToggle}
          series={topProductsData?.bottles}
        />
      ) : (
        <BarChartSales
          widgetTitle={title}
          widgetSubtitle={subtitle}
          label={label}
          colors={colors}
          toggle={toggle}
          setToggle={setToggle}
          series={topProductsData?.sales}
        />
      )}
    </div>
  ) : (
    <></>
  );
};

export default DashboardTopProductsSalesBarChart;
