import { useRouter } from 'next/router';

import moment from 'moment';

import ActionButtons from '@components/common/action-buttons';
import ViewButton from '@components/common/view-button';
import { Table } from '@components/ui/table';

import {
  adminOnly,
  brandOnly,
  getAuthCredentials,
  hasAccess,
  superAdminAndAdminAndBrandOnly,
  superAdminOnly,
} from '@utils/auth-utils';
import usePrice from '@utils/use-price';

import { OrderPaginator } from '@ts-types/generated';

import OrderStatusDetail from './components/order-status-detail';

type IProps = {
  orders: OrderPaginator | null | undefined;
  onPagination: (current: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
};

type OrderDetail = {
  status: number;
  order_date: string | null | undefined;
  total: number;
  qty: number;
};

type OrderCustomer = {
  customer_id: string | null | undefined;
  customer_type: string | null | undefined;
};

const OrderList = ({ orders }: IProps) => {
  const { permissions: currentUserPermissions } = getAuthCredentials();

  const { data } = orders! ?? {};
  const router = useRouter();

  const columns = [
    {
      title: 'Customer',
      dataIndex: 'OrderCustomer',
      key: 'OrderCustomer',
      align: 'left',
      width: 120,
      hasAccess: hasAccess(
        superAdminAndAdminAndBrandOnly,
        currentUserPermissions
      ),
      render: (record: any) => {
        return (
          <span>
            {record?.OrderCustomer?.customer_type === 'B2B'
              ? record?.OrderCustomer?.account_name
              : `${record?.OrderCustomer?.first_name} ${record?.OrderCustomer?.last_name}`}
          </span>
        );
      },
    },
    {
      title: 'Lexir Order ID',
      dataIndex: 'order_lexir_id',
      key: 'order_lexir_id',
      align: 'left',
      width: 50,
      hasAccess: hasAccess(
        superAdminAndAdminAndBrandOnly,
        currentUserPermissions
      ),
      render: (order_old_id: any, order: any) => {
        order_old_id = order_old_id != null ? order_old_id : order.id;
        return <span className='whitespace-nowrap'>{`#${order_old_id}`}</span>;
      },
    },
    {
      title: 'Customer Type',
      dataIndex: 'OrderCustomer',
      key: 'OrderCustomer',
      align: 'left',
      width: 80,
      hasAccess: hasAccess(
        superAdminAndAdminAndBrandOnly,
        currentUserPermissions
      ),
      render: (OrderCustomer: OrderCustomer) => {
        return <span>{OrderCustomer.customer_type}</span>;
      },
    },
    {
      title: 'Order Value',
      dataIndex: 'OrderDetail',
      key: 'OrderDetail',
      align: 'left',
      width: 50,
      hasAccess: hasAccess(
        superAdminAndAdminAndBrandOnly,
        currentUserPermissions
      ),
      render: (OrderDetail: OrderDetail) => {
        const { price } = usePrice({
          amount: OrderDetail.total,
        });
        return <span>{price}</span>;
      },
    },
    {
      title: 'Order Date',
      className: 'cursor-pointer',
      dataIndex: 'OrderDetail',
      key: 'OrderDetail',
      align: 'left',
      width: 90,
      hasAccess: hasAccess(
        superAdminAndAdminAndBrandOnly,
        currentUserPermissions
      ),
      render: (OrderDetail: OrderDetail) => {
        return (
          <span>{moment(OrderDetail.order_date).format('DD MMM YYYY')}</span>
        );
      },
    },
    {
      title: 'Qty (un)',
      dataIndex: 'OrderDetail',
      key: 'OrderDetail',
      align: 'left',
      width: 80,
      hasAccess: hasAccess(
        superAdminAndAdminAndBrandOnly,
        currentUserPermissions
      ),
      render: (OrderDetail: OrderDetail) => {
        return <span>{OrderDetail?.qty}</span>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'OrderDetail',
      key: 'OrderDetail',
      align: 'left',
      width: 80,
      hasAccess: hasAccess(
        superAdminAndAdminAndBrandOnly,
        currentUserPermissions
      ),
      render: (OrderDetail: OrderDetail) => {
        return <OrderStatusDetail data={OrderDetail?.status} />;
      },
    },
    {
      title: '',
      dataIndex: 'id',
      key: 'actions',
      align: 'left',
      width: 50,
      hasAccess: hasAccess(brandOnly, currentUserPermissions),
      render: (id: string) => (
        <ActionButtons
          id={id}
          detailsUrl={`${router.asPath}/${id}`}
          chevron={true}
        />
      ),
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
              editUrlDropDown={`${router.asPath}/${id}`}
              editText={'Order Details'}
              deleteModalView='DELETE_ORDER'
            />
          </div>
        );
      },
    },
    {
      title: '',
      dataIndex: 'id',
      key: 'actions',
      align: 'center',
      width: 50,
      hasAccess: hasAccess(adminOnly, currentUserPermissions),
      render: (id: string) => {
        return (
          <div className='flex cursor-pointer justify-center'>
            <ViewButton id={id} url={`${router.asPath}/${id}`} />
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
            Orders List
          </span>
          <span className='mt-2 text-xs text-[#6F6F6F]'>{`Showing ${data.length} of ${data.length}`}</span>
        </div>
        <Table
          /* @ts-ignore */
          columns={columns.filter((column) => column.hasAccess === true)}
          emptyText={'Empty'}
          data={data}
          rowKey='id'
          scroll={{ x: 900 }}
        />
      </div>
    </>
  );
};

export default OrderList;
