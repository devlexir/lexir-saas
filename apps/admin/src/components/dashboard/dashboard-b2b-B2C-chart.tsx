import { useAtom } from 'jotai';

import { useSSE } from 'use-sse';

import DonutChartBottles from '@components/widgets/donut-chart-bottles';
import DonutChartSales from '@components/widgets/donut-chart-sales';

import { API_ENDPOINTS } from '@utils/api/endpoints';
import { getSubdomain } from '@utils/request-utils';

import { startDateAtom } from '@contexts/dashboard';
import { endDateAtom } from '@contexts/dashboard';

// Solved! 25-07-2022
const DashboardB2bB2cChart = ({
  title,
  subtitle,
  b2cVsB2bToggle,
  setB2cVsB2bToggle,
}: any) => {
  const [startDate] = useAtom(startDateAtom);
  const [endDate] = useAtom(endDateAtom);

  const { subdomain: subdomain } = getSubdomain();

  const [b2bVsB2cData] = useSSE(() => {
    return fetch(
      `${process.env.NEXT_PUBLIC_NEW_REST_API_ENDPOINT}/${API_ENDPOINTS.DASHBOARD_B2B_VS_B2C}?subdomain=${subdomain}&startDate=${startDate}&endDate=${endDate}`
    ).then((res) => res.json());
  }, [startDate, endDate]);

  return (
    <div className='w-full rounded-lg border border-[#E7E7E7] sm:w-1/2 sm:pr-0 xl:mb-0 xl:w-1/2'>
      {b2cVsB2bToggle ? (
        <DonutChartBottles
          widgetTitle={title}
          widgetSubtitle={subtitle}
          colors={['#85cdb4', '#6cafe6']}
          series={b2bVsB2cData?.bottles || [0, 0]}
          labels={['B2B', 'B2C']}
          toggle={b2cVsB2bToggle}
          setToggle={setB2cVsB2bToggle}
        />
      ) : (
        <DonutChartSales
          widgetTitle={title}
          widgetSubtitle={subtitle}
          colors={['#85cdb4', '#6cafe6']}
          series={b2bVsB2cData?.sales || [0, 0]}
          labels={['B2B', 'B2C']}
          toggle={b2cVsB2bToggle}
          setToggle={setB2cVsB2bToggle}
        />
      )}
    </div>
  );
};

export default DashboardB2bB2cChart;
