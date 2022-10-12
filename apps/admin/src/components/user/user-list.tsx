import { useState } from 'react';

import { useTranslation } from 'next-i18next';

import ActionButtons from '@components/common/action-buttons';
import { Table } from '@components/ui/table';
import TitleWithSort from '@components/ui/title-with-sort';

import { useIsRTL } from '@utils/locals';
import usePrice from '@utils/use-price';

import { SortOrder, UserPaginator } from '@ts-types/generated';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

type IProps = {
  title: string;
  customers: UserPaginator | null | undefined;
  onPagination: (current: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
};
const CustomerList = ({
  title = 'Customers List',
  customers,
  onSort,
  onOrder,
}: IProps) => {
  const { data } = customers!;
  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();

  const [sortingObj, setSortingObj] = useState<{
    sort: SortOrder;
    column: any | null;
  }>({
    sort: SortOrder.Desc,
    column: null,
  });

  const onHeaderClick = (column: any | null) => ({
    onClick: () => {
      onSort((currentSortDirection: SortOrder) =>
        currentSortDirection === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc
      );

      onOrder(column);

      setSortingObj({
        sort:
          sortingObj.sort === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc,
        column: column,
      });
    },
  });

  const columns = [
    {
      title: 'Customer',
      dataIndex: 'name',
      key: 'name',
      align: 'left',
      width: 100,
    },
    {
      title: (
        <TitleWithSort
          title={t('City')}
          ascending={
            sortingObj.sort === SortOrder.Asc && sortingObj.column === 'city'
          }
          isActive={sortingObj.column === 'city'}
        />
      ),
      dataIndex: ['address', '0', 'address', 'city'],
      key: ['address', '0', 'address', 'city'],
      align: 'alignLeft',
      width: 80,
    },
    {
      title: (
        <TitleWithSort
          title={t('Account Type')}
          ascending={
            sortingObj.sort === SortOrder.Asc &&
            sortingObj.column === 'account_type'
          }
          isActive={sortingObj.column === 'account_type'}
        />
      ),
      dataIndex: 'account_type',
      key: 'account_type',
      align: alignLeft,
    },
    {
      title: (
        <TitleWithSort
          title={t('Latest Order')}
          ascending={
            sortingObj.sort === SortOrder.Asc &&
            sortingObj.column === 'latest_order'
          }
          isActive={sortingObj.column === 'latest_order'}
        />
      ),
      dataIndex: 'latest_order',
      key: 'latest_order',
      align: 'center',
      width: 80,
      onHeaderCell: () => onHeaderClick('created_at'),
      render: (date: string) => {
        dayjs.extend(relativeTime);
        dayjs.extend(utc);
        dayjs.extend(timezone);
        return (
          <span className='whitespace-nowrap'>
            {dayjs.utc(date).format('DD/MM/YYYY')}
          </span>
        );
      },
    },
    {
      title: (
        <TitleWithSort
          title={t('Sales to Date')}
          ascending={
            sortingObj.sort === SortOrder.Asc && sortingObj.column === 'sales'
          }
          isActive={sortingObj.column === 'sales'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      render: (id: number) => {
        const { price } = usePrice({
          amount: id,
        });
        return <span>{price}</span>;
      },
    },
    {
      title: t('Contact'),
      dataIndex: 'id',
      key: 'actions',
      align: 'center',
      render: (id: string, { is_active }: any) => {
        return (
          <>
            <ActionButtons
              id={id}
              isUserActive={is_active}
              contactPhone='contactPhone'
              contactEmail='contactEmail'
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className='mb-6 overflow-hidden rounded bg-white shadow'>
        <div className='my-6 ml-4 text-xs text-[#6F6F6F] flex flex-col'>
          <span className='text-[#4F4F4F] font-semibold'>{title}</span>
          <span className='text-xs text-[#6F6F6F] mt-2'>{`Showing ${data.length} of ${data.length}`}</span>
        </div>
        <Table
          // @ts-ignore
          columns={columns}
          emptyText={t('table:empty-table-data')}
          data={data}
          rowKey='id'
          scroll={{ x: 800 }}
        />
      </div>
    </>
  );
};

export default CustomerList;
