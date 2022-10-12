import { useAtom } from 'jotai';

import { useSSE } from 'use-sse';

import { Table } from '@components/ui/table';

import { API_ENDPOINTS } from '@utils/api/endpoints';
import { getSubdomain } from '@utils/request-utils';
import fomatedValue from '@utils/use-formated-value';
import { formatPrice } from '@utils/use-price';

import { startDateAtom } from '@contexts/dashboard';
import { endDateAtom } from '@contexts/dashboard';
import { useSettings } from '@contexts/settings.context';
import { siteSettings } from '@settings/site.settings';

const DashboardTopAccounts = ({ title, subtitle }: any) => {
  const [startDate] = useAtom(startDateAtom);
  const [endDate] = useAtom(endDateAtom);

  const { subdomain: subdomain } = getSubdomain();

  const { currency } = useSettings();
  const locale = siteSettings.defaultLanguage;

  const [topAccountData] = useSSE(() => {
    return fetch(
      `${process.env.NEXT_PUBLIC_NEW_REST_API_ENDPOINT}/${API_ENDPOINTS.DASHBOARD_TOP_ACCOUNTS}?subdomain=${subdomain}&startDate=${startDate}&endDate=${endDate}`
    ).then((res) => res.json());
  }, [startDate, endDate]);

  const totalGrossSales =
    topAccountData &&
    topAccountData?.reduce(function (sum: any, b: any) {
      return parseFloat(sum) + parseFloat(b.total);
    }, 0);
  const totalQty =
    topAccountData &&
    topAccountData
      ?.reduce(function (sum: any, b: any) {
        return parseFloat(sum) + parseFloat(b.qty);
      }, 0)
      .toLocaleString(locale);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      align: 'left',
    },
    {
      title: 'Customer Type',
      dataIndex: 'customer_type',
      key: 'customer_type',
      align: 'left',
    },
    {
      title: 'Gross Sales',
      dataIndex: 'total',
      key: 'total',
      align: 'left',
      render: function (total: any) {
        return formatPrice({
          amount: total,
          currencyCode: currency,
          locale: locale,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        });
      },
    },
    {
      title: 'Qty (un)',
      dataIndex: 'qty',
      key: 'qty',
      align: 'left',
      render: function (qty: any) {
        return qty?.toLocaleString(locale);
      },
    },
  ];

  return (
    <>
      <div className='mt-6 min-h-fit w-full overflow-hidden rounded-lg border border-[#E7E7E7] bg-white shadow sm:mt-0'>
        <div className='px-4 pb-3 pt-8 text-[#4F4F4F]'>
          <h3 className='bg-light  font-semibold  text-heading'>{title}</h3>
          <h5 className='text-sm text-[#6F6F6F]'>{subtitle}</h5>
        </div>
        <Table
          tableLayout={'fixed'}
          //@ts-ignore
          columns={columns}
          emptyText={'Empty Data'}
          data={topAccountData}
          rowKey='id'
          scroll={{ x: 300 }}
          footer={() => (
            <div className='rc-table-container w-full '>
              <div className=' w-full '>
                <table style={{ tableLayout: 'fixed' }}>
                  <colgroup></colgroup>
                  <thead className='rc-table-thead w-full '>
                    <tr>
                      <th
                        className='rc-table-cell'
                        style={{ textAlign: 'left', color: '#1C8C64' }}
                      ></th>
                      <th
                        className='rc-table-cell'
                        style={{ textAlign: 'left', color: '#1C8C64' }}
                      >
                        Total
                      </th>
                      <th
                        className='rc-table-cell'
                        style={{ textAlign: 'left', color: '#1C8C64' }}
                      >
                        {fomatedValue(totalGrossSales, 0, 0)}
                      </th>
                      <th
                        className='rc-table-cell'
                        style={{ textAlign: 'left', color: '#1C8C64' }}
                      >
                        {totalQty}
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          )}
        />
      </div>
    </>
  );
};

export default DashboardTopAccounts;
