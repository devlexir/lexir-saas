import ToggleButton from '@components/atoms/toggleButton';
import Chart from '@components/ui/chart';

const BarChart = ({
  widgetTitle,
  widgetSubtitle,
  series,
  colors,
  toggle,
  setToggle,
  label,
}: any) => {
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
          horizontal: true,
          columnWidth: '65%',
          endingShape: 'rounded',
          borderRadius: 8,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: false,
        width: 2,
      },
      grid: {
        borderColor: '#F7F7F7',
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
          style: {
            colors: '#161F6A',
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
            color: '#161F6A',
            fontSize: '14px',
            fontFamily: "'Lato', sans-serif",
          },
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

export default BarChart;
