import { useState } from 'react';

import { useRouter } from 'next/router';

import moment from 'moment';

import ActionButtons from '@components/common/action-buttons';
import { Table } from '@components/ui/table';

import {
  getAuthCredentials,
  hasAccess,
  superAdminAndAdminAndBrandOnly,
  superAdminOnly,
} from '@utils/auth-utils';

import { CrossSignIcon } from '@assets/icons/CrossSignIcon';
import { DoneIcon } from '@assets/icons/DoneIcon';
import { SortOrder, UserPaginator } from '@ts-types/generated';

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
  const { permissions: currentUserPermissions } = getAuthCredentials();

  const { data } = customers!;

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
      title: 'Customer',
      dataIndex: 'account_name',
      key: 'account_name',
      align: 'left',
      width: 150,
      hasAccess: hasAccess(
        superAdminAndAdminAndBrandOnly,
        currentUserPermissions
      ),
      render: (id: number, record: any) => {
        return (
          <span>
            {record?.customer_type === 'B2B'
              ? record?.account_name
              : `${record?.first_name} ${record?.last_name}`}
          </span>
        );
      },
    },
    {
      title: 'Customer Type',
      dataIndex: 'customer_type',
      key: 'customer_type',
      align: 'left',
      width: 80,
      hasAccess: hasAccess(
        superAdminAndAdminAndBrandOnly,
        currentUserPermissions
      ),
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      align: 'left',
      width: 100,
      hasAccess: hasAccess(
        superAdminAndAdminAndBrandOnly,
        currentUserPermissions
      ),
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'left',
      width: 40,
      hasAccess: hasAccess(
        superAdminAndAdminAndBrandOnly,
        currentUserPermissions
      ),
      render: (date: string) => {
        return (
          <span className='whitespace-nowrap'>
            {moment(date).format('DD MMM YYYY')}
          </span>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'customer_status',
      key: 'customer_status',
      align: 'center',
      width: 30,
      hasAccess: hasAccess(
        superAdminAndAdminAndBrandOnly,
        currentUserPermissions
      ),
      render: (customer_status: string) => {
        if (customer_status === 'Not Validated') {
          return (
            <span className={'flex justify-center'}>
              <CrossSignIcon />
            </span>
          );
        } else if (customer_status === 'Validated') {
          return (
            <span className={'flex justify-center'}>
              <DoneIcon />
            </span>
          );
        }
      },
    },

    {
      title: '',
      dataIndex: 'id',
      key: 'actions',
      align: 'center',
      width: 50,
      hasAccess: hasAccess(superAdminOnly, currentUserPermissions),
      render: (id: string) => {
        return (
          <div className='flex cursor-pointer justify-center'>
            <ActionButtons
              id={id}
              editUrlDropDown={`${router.asPath}/${id}/edit`}
              deleteModalView='DELETE_CUSTOMER'
            />
          </div>
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
          columns={columns.filter((column) => column.hasAccess === true)}
          emptyText={'Empty Data'}
          data={data}
          rowKey='id'
          scroll={{ x: 800 }}
        />
      </div>
    </>
  );
};

export default CustomerList;
