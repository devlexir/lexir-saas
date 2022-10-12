import ToggleButton from '@components/atoms/toggleButton';
import Chart from '@components/ui/chart';

import { formatPrice } from '@utils/use-price';

import { useSettings } from '@contexts/settings.context';
import { siteSettings } from '@settings/site.settings';

const BarChartSales = ({
  widgetTitle,
  widgetSubtitle,
  series,
  colors,
  toggle,
  setToggle,
  label,
}: any) => {
  const { currency } = useSettings();
  const locale = siteSettings.defaultLanguage;

  const options = {
    options: {
      chart: {
        type: 'bar',
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: 'top',
            maxItems: 100,
            hideOverflowingLabels: true,
            orientation: 'horizontal',
          },
          horizontal: true,
          columnWidth: '30%',
          barHeight: '75%',
          barWidth: '30%',
          endingShape: 'rounded',
          rangeBarOverlap: true,
          borderRadius: 8,
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
          colors: ['rgba(28, 140, 100, 1)'],
        },
        formatter: function (series: any) {
          return formatPrice({
            amount: series,
            currencyCode: currency,
            locale: locale,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          });
        },
        offsetX: 50,
      },
      stroke: {
        show: false,
        width: 2,
      },
      grid: {
        borderColor: '#E5E7EB',
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      states: {
        normal: {
          filter: {
            type: 'none',
            value: 0,
          },
        },
        hover: {
          filter: {
            type: 'darken',
            value: 0.7,
          },
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: 'darken',
            value: 0.35,
          },
        },
      },
      colors: colors,
      xaxis: {
        labels: {
          show: true,
          formatter: function (val: any) {
            return formatPrice({
              amount: val,
              currencyCode: currency,
              locale: locale,
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            });
          },
          style: {
            colors: '#2f2f2f',
            fontSize: '14px',
            fontFamily: "'Lato', sans-serif",
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        // categories: categories,
      },
      yaxis: {
        show: true,
        labels: {
          show: true,
          style: {
            colors: '#2f2f2f',
            fontSize: '14px',
            fontFamily: "'Lato', sans-serif",
          },
        },
      },
      tooltip: {
        enabled: true,
        fillSeriesColor: false,
        style: {
          fontSize: '12px',
          fontFamily: undefined,
          background: '#f3f3f3',
        },
        onDatasetHover: {
          highlightDataSeries: false,
        },
        x: {
          show: true,
        },
        y: {
          show: true,
          formatter: function (series: any) {
            return formatPrice({
              amount: series,
              currencyCode: currency,
              locale: locale,
            });
          },
        },
        marker: {
          show: false,
        },
      },
    },
    series: [
      {
        name: label,
        data: series,
      },
    ],
  };

  return (
    <div className='h-full w-full rounded bg-light shadow-sm'>
      <div className='flex items-center justify-between p-8'>
        <div className='w-full'>
          <div className='flex flex-col'>
            <span className='flex justify-between'>
              <span className='flex items-center text-16 font-bold text-gray-800'>
                {widgetTitle}
              </span>

              <ToggleButton toggle={toggle} setToggle={setToggle} />
            </span>
            {widgetSubtitle ? (
              <span className='mt-2 text-12 text-gray-600'>
                {widgetSubtitle}
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <div className='flex w-full flex-wrap px-4' style={{ display: 'block' }}>
        <Chart
          options={options.options}
          series={options.series}
          height='350'
          width='100%'
          type='bar'
        />
      </div>
    </div>
  );
};

export default BarChartSales;
