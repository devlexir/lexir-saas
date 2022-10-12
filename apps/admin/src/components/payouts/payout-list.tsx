import Link from 'next/link';
import { useRouter } from 'next/router';

import moment from 'moment';

import ActionButtons from '@components/common/action-buttons';
import { Table } from '@components/ui/table';

import {
  getAuthCredentials,
  hasAccess,
  superAdminAndAdminAndBrandOnly,
  superAdminAndAdminOnly,
  superAdminOnly,
} from '@utils/auth-utils';

import PayoutStatus from './payout-status';

type IProps = {
  title: string;
  payouts: any;
  onPagination: (current: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
};
const PayoutsList = ({ title, payouts }: IProps) => {
  const router = useRouter();
  const { permissions: currentUserPermissions } = getAuthCredentials();

  const columns = [
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
      align: 'left',
      width: 50,
      hasAccess: hasAccess(superAdminAndAdminOnly, currentUserPermissions),
    },
    {
      title: 'Period',
      dataIndex: 'payout_period',
      key: 'payout_period',
      align: 'left',
      width: 50,
      hasAccess: hasAccess(
        superAdminAndAdminAndBrandOnly,
        currentUserPermissions
      ),
      render: (payout_period: string) => {
        return (
          <span className='whitespace-nowrap'>
            {moment(payout_period).format('MMM YYYY')}
          </span>
        );
      },
    },

    {
      title: 'Link to report',
      dataIndex: 'reportUrl',
      key: 'reportUrl',
      align: 'left',
      width: 50,
      hasAccess: hasAccess(
        superAdminAndAdminAndBrandOnly,
        currentUserPermissions
      ),
      render: function (customer_id: any) {
        return (
          <div>
            <Link href={customer_id}>
              <a className='underline' target='_blank'>
                View Report
              </a>
            </Link>
          </div>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 50,
      hasAccess: hasAccess(
        superAdminAndAdminAndBrandOnly,
        currentUserPermissions
      ),
      render: (status: string) => {
        return <PayoutStatus status={status} />;
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
              deleteModalView='DELETE_PAYOUTS'
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
        </div>
        <Table
          // @ts-ignore
          columns={columns.filter((column) => column.hasAccess === true)}
          emptyText={'Empty Data'}
          data={payouts}
          rowKey='id'
          scroll={{ x: 800 }}
        />
      </div>
    </>
  );
};

export default PayoutsList;
