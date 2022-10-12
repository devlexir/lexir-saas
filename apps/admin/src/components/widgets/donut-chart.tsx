import ToggleButton from '@components/atoms/toggleButton';
import Chart from '@components/ui/chart';

const DonutChart = ({
  widgetTitle,
  widgetSubtitle,
  series,
  labels,
  colors,
  toggle,
  setToggle,
}: any) => {
  const options = {
    options: {
      colors: colors,
      dataLabels: {
        enabled: true,
        formatter: function (labels: any) {
          return labels.toFixed(2) + '%';
        },
      },
      labels: labels,
      legend: {
        show: false,
      },
      stroke: {
        show: false,
      },
      states: {
        hover: {
          filter: {
            type: 'darken',
            value: 0.8,
          },
        },
      },
      plotOptions: {
        pie: {
          donut: {},
          expandOnClick: false,
          customScale: 1,
        },
      },
    },
    series: series,
  };

  return (
    <div className='h-full w-full rounded-lg bg-light shadow'>
      <div className='mt-2 flex flex-col pl-4 pr-6 sm:mt-0 xs:flex-row'>
        <div className='w-full'>
          <div className='flex flex-col px-4 pt-8'>
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

          <Chart
            options={options.options}
            series={options.series}
            width='100%'
            type='donut'
          />

          <div className='flex items-start justify-center py-8'>
            <div className=' flex items-baseline justify-evenly'>
              <div className='flex items-center '>
                <span className='mr-1 flex h-6 w-6 rounded-full bg-[#85CDB4]'></span>
                <span className='text-xs text-body '>{labels[0]}</span>
              </div>

              <div className='ml-4 flex items-center'>
                <span
                  className={`mr-1 flex h-6 w-6 rounded-full bg-[${colors[1]}]`}
                ></span>
                <span className='text-xs text-body '>{labels[1]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
