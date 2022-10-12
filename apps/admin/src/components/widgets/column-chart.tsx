import ToggleButton from '@components/atoms/toggleButton';
import { ArrowDown } from '@components/icons/arrow-down';
import { ArrowUp } from '@components/icons/arrow-up';
import Chart from '@components/ui/chart';

import cn from 'classnames';

const ColummChart = ({
  widgetTitle,
  widgetSubtitle,
  series,
  colors,
  totalValue,
  text,
  position,
  percentage,
  serieName,
  toggle,
  setToggle,
}: any) => {
  const options = {
    options: {
      chart: {
        toolbar: {
          show: false,
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
      plotOptions: {
        bar: {
          dataLabels: {
            position: 'top',
          },
          columnWidth: '65%',
          endingShape: 'rounded',
          borderRadius: 8,
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        show: false,
        width: 2,
      },
      grid: {
        borderColor: '#CCCCCC',
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      colors: colors,
      xaxis: {
        labels: {
          show: true,
          style: {
            colors: '#161F6A',
            fontSize: '12px',
            fontFamily: "'Lato', sans-serif",
          },
        },
        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
        labels: {
          show: true,
          style: {
            color: '#161F6A',
            fontSize: '14px',
            fontFamily: "'Lato', sans-serif",
          },
        },
      },
    },
    series: [
      {
        name: serieName,
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
              <span className='text-16 font-bold text-gray-800'>
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
          <div className='flex flex-col'>
            <span className='text-lg font-semibold text-green-500'>
              {totalValue}
            </span>

            <div className='flex items-center'>
              {position === 'up' && (
                <span className='text-green-500'>
                  <ArrowUp />
                </span>
              )}
              {position === 'down' && (
                <span className='text-red-400'>
                  <ArrowDown />
                </span>
              )}
              <span className='text-sm text-heading ms-1'>
                <span
                  className={cn(
                    position === 'down' ? 'text-red-400' : 'text-green-500'
                  )}
                >
                  {percentage}
                </span>
                &nbsp;
                {text}
              </span>
            </div>
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

export default ColummChart;
