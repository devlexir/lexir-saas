import { useState } from 'react';

import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import ActionButtons from '@components/common/action-buttons';
import { Table } from '@components/ui/table';

import { SortOrder, UserPaginator } from '@ts-types/generated';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

type IProps = {
  title: string;
  customers: UserPaginator | null | undefined;
  onPagination: (current: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
};
const UsersList = ({
  title = 'Users list',
  customers,
  onSort,
  onOrder,
}: IProps) => {
  const { data } = customers!;

  const { t } = useTranslation();
  const router = useRouter();

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
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
      align: 'left',
      width: 150,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      align: 'left',
      width: 70,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'left',
      width: 100,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'left',
      width: 80,
      render: (createdAt: string) => (
        <span className='whitespace-nowrap'>
          {dayjs().to(dayjs.utc(createdAt).tz(dayjs.tz.guess()))}
        </span>
      ),
    },
    {
      title: '',
      dataIndex: 'id',
      key: 'actions',
      align: 'left',
      width: 50,
      render: (id: string) => {
        return (
          <>
            <div className='flex cursor-pointer justify-evenly'>
              <div className='flex justify-end'>
                <ActionButtons
                  id={id}
                  editUrlDropDown={`${router.asPath}/${id}/edit`}
                  deleteModalView='DELETE_USERS'
                />
              </div>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className='mb-6 overflow-hidden rounded-lg border border-[#E7E7E7] bg-white shadow'>
        <div className='my-6 ml-4 flex flex-col text-xs text-[#6F6F6F]'>
          <span className='text-base font-semibold text-[#4F4F4F]'>
            {title}
          </span>
          <span className='mt-2 text-xs text-[#6F6F6F]'>{`Showing ${data.length} of ${data.length}`}</span>
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

export default UsersList;
