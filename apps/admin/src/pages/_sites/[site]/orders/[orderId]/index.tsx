import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { useAtom } from 'jotai';

import { Card } from '@components/common/card';
import Layout from '@components/layouts/admin';
import ErrorMessage from '@components/ui/error-message';
import ValidationError from '@components/ui/form-validation-error';
import Loader from '@components/ui/loader/loader';
import { useModalAction } from '@components/ui/modal/modal.context';
import ProgressBox from '@components/ui/progress-box/progress-box';
import SelectInput from '@components/ui/select-input';
import { Table } from '@components/ui/table';

import {
  getAuthCredentials,
  hasAccess,
  superAdminOnly,
} from '@utils/auth-utils';
import { useIsRTL } from '@utils/locals';
import { getSubdomain } from '@utils/request-utils';
import fomatedValue from '@utils/use-formated-value';
import usePrice from '@utils/use-price';

import { clearCheckoutAtom } from '@contexts/checkout';
import { useCart } from '@contexts/quick-cart/cart.context';
import { useOrderQuery } from '@data/order/use-order.query';
import { siteSettings } from '@settings/site.settings';

type FormValues = {
  order_status: any;
};

export default function OrderDetailsPage() {
  const [selectedOption, setSelectedOption] = useState(0);
  const [status, setStatusOption] = useState({
    label: 'New',
    value: 1,
  });

  const { permissions: currentUserPermissions } = getAuthCredentials();
  const { subdomain: subdomain } = getSubdomain();

  const { query } = useRouter();
  const { alignLeft, alignRight } = useIsRTL();
  const { resetCart } = useCart();
  const [, resetCheckout] = useAtom(clearCheckoutAtom);
  const { openModal } = useModalAction();

  useEffect(() => {
    resetCart();
    resetCheckout();
  }, [resetCart, resetCheckout]);

  const {
    data,
    isLoading: loading,
    isFetched,
    error,
  } = useOrderQuery(query.orderId, subdomain);

  const orderStatusData = [
    {
      label: 'New',
      value: 1,
    },
    {
      label: 'Processing',
      value: 2,
    },
    {
      label: 'In Transit',
      value: 3,
    },
    {
      label: 'Delivered',
      value: 4,
    },
    {
      label: 'Paid',
      value: 5,
    },
    {
      label: 'Canceled',
      value: 6,
    },
  ];

  useMemo(() => {
    setStatusOption(
      //@ts-ignore
      orderStatusData.filter(
        (option: any) => option.value === data?.order.OrderDetail.status
      )
    );
    setSelectedOption(
      //@ts-ignore
      orderStatusData.filter(
        (option: any) => option.value === data?.order.OrderDetail.status
      )
    );
  }, [isFetched, data]);

  const changeStatusFunction = (e: any) => {
    setSelectedOption(e.value);
    ChangeStatus(e.value);
  };

  const {
    handleSubmit,
    control,
    formState: {},
  } = useForm<FormValues>({
    defaultValues: { order_status: data?.order?.status?.id ?? '' },
  });

  const ChangeStatus = (e: any) => {
    let payload = {
      id: data?.order?.id as string,
      changeStatusId: e as string,
    };
    openModal('CHANGE_ORDER_STATUS', payload);
  };

  if (loading) return <Loader text='Loading' />;
  if (error) return <ErrorMessage message={error.message} />;

  const columns = [
    {
      title: '',
      dataIndex: 'imageSRC',
      key: 'imageSRC',
      width: 74,
      align: 'center',
      render: (image: any) => (
        <Image
          src={image ?? siteSettings.product.placeholder}
          alt='coupon banner'
          layout='fixed'
          width={20}
          height={50}
          className='overflow-hidden rounded'
        />
      ),
    },
    {
      title: 'Products',
      dataIndex: 'name',
      key: 'name',
      align: alignLeft,
      render: (item: any) => (
        <div>
          <span>{item.product_name}</span>
        </div>
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'qty',
      key: 'qty',
      align: alignRight,
      width: 90,
      render: (_: any, item: any) => {
        return <span>{item.qty}</span>;
      },
    },
    {
      title: 'Unit Price',
      dataIndex: 'unit_price',
      key: 'unit_price',
      align: alignRight,
      width: 90,
      render: (_: any, item: any) => {
        const { price } = usePrice({
          amount: parseFloat(item.unit_price),
        });
        return <span>{price}</span>;
      },
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      align: alignRight,
      width: 90,
      render: (_: any, item: any) => {
        const { price } = usePrice({
          amount: parseFloat(item.total),
        });
        return <span>{price}</span>;
      },
    },
  ];

  return (
    <Card className='rounded-lg p-4 pt-8'>
      <div className='mt-2 flex flex-col lg:flex-row lg:items-center lg:justify-between'>
        <h3 className='mb-4 w-full text-start text-2xl font-semibold text-[#4F4F4F] lg:mb-0 lg:w-1/2'>
          Order ID -{' '}
          <span className='text-2xl text-[#6F6F6F]'>
            #{data?.order?.order_lexir_id}
          </span>
        </h3>

        <div className='flex flex-row items-center justify-end'>
          {hasAccess(superAdminOnly, currentUserPermissions) ? (
            <form
              onSubmit={handleSubmit(ChangeStatus)}
              className='gap-x-30 flex items-center md:gap-x-3 '
            >
              <div className='z-20 flex items-center justify-start  md:justify-end '>
                <SelectInput
                  name='order_status'
                  control={control}
                  options={orderStatusData}
                  placeholder='Order Status'
                  value={status}
                  onChange={changeStatusFunction}
                />

                <ValidationError message={orderStatusData?.data?.message} />
              </div>
            </form>
          ) : null}
        </div>
      </div>

      <div className='my-5 flex items-center justify-center lg:my-10'>
        <ProgressBox
          data={data?.order?.OrderStatus}
          status={data?.order?.OrderDetail?.status}
        />
      </div>

      <div className='rounded-lg border p-4'>
        <div className='-mx-4 mb-10'>
          {data?.order.OrderItem ? (
            <Table
              //@ts-ignore
              columns={columns}
              emptyText='Order data'
              data={data?.order?.OrderItem}
              rowKey='id'
              scroll={{ x: 300 }}
            />
          ) : (
            <span>No order Found</span>
          )}
          <div className='flex w-full flex-col space-y-2 px-4 py-4 ms-auto sm:w-1/2 md:w-1/3'>
            <div className='flex items-center justify-between text-sm text-body'>
              <span>Sub Total</span>

              <span>
                {data?.order?.OrderDetail.subtotal &&
                  fomatedValue(data?.order?.OrderDetail.subtotal)}{' '}
              </span>
            </div>
            <div className='flex items-center justify-between text-sm text-body'>
              <span>VAT</span>
              <span>
                {' '}
                {data?.order?.OrderDetail.vat
                  ? fomatedValue(data?.order?.OrderDetail.vat)
                  : '-'}
              </span>
            </div>

            <div className='flex items-center justify-between text-base font-semibold text-heading'>
              <span>Order Total</span>
              <span>
                {data?.order?.OrderDetail.total
                  ? fomatedValue(data?.order?.OrderDetail.total)
                  : '-'}
              </span>
            </div>
          </div>
        </div>

        <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between'>
          <div className='mb-10 w-full '>
            <h3 className='mb-3 border-b border-border-200 pb-2 font-semibold text-heading'>
              Customer
            </h3>

            <div className='flex flex-col items-start space-y-1 text-sm text-body'>
              {data?.order?.OrderCustomer?.customer_type === 'B2C' ? (
                <span>
                  Name: {data?.order?.OrderCustomer?.first_name}{' '}
                  {data?.order?.OrderCustomer?.last_name}
                </span>
              ) : (
                <span>
                  Account Name: {data?.order?.OrderCustomer?.account_name}
                </span>
              )}

              <span>
                Customer Type: {data?.order?.OrderCustomer?.customer_type}
              </span>

              <span>Email: {data?.order?.OrderCustomer?.email}</span>
              <span>Phone: {data?.order?.OrderCustomer?.phone_number}</span>
            </div>
          </div>
        </div>

        <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between'>
          <div className='mb-10 w-full sm:mb-0 sm:w-1/2 '>
            <h3 className='mb-3 border-b border-border-200 pb-2 font-semibold text-heading'>
              Billing Address
            </h3>

            <div className='flex flex-col items-start space-y-1 text-sm text-body'>
              <span>
                {data?.order?.OrderBillingAddress?.billing_name || '_'}
              </span>
              <span>
                {((data?.order?.OrderBillingAddress &&
                  data?.order?.OrderBillingAddress?.billing_address) ||
                  '_') +
                  ' ' +
                  data?.order?.OrderBillingAddress?.billing_address2 || '_'}
              </span>
              <span>
                {data?.order?.OrderBillingAddress &&
                  `${data?.order?.OrderBillingAddress?.billing_country || '_'}
                ${data?.order?.OrderBillingAddress?.billing_city || '_'} 
                ${data?.order?.OrderBillingAddress?.billing_state || '_'}
                ${data?.order?.OrderBillingAddress?.billing_zip || '_'}`}
              </span>
              <span>{data?.order?.OrderCustomer?.phone_number || '_'}</span>
            </div>
          </div>

          <div className='mb-6 w-full sm:mb-0 sm:w-1/2 '>
            <h3 className='mb-3 border-b border-border-200 pb-2 text-start font-semibold text-heading sm:text-end'>
              Shipping Address
            </h3>

            <div className='flex flex-col items-start space-y-1 text-start text-sm text-body sm:items-end sm:text-end'>
              <span>
                {(data?.order?.OrderCustomer &&
                  data?.order?.OrderCustomer?.first_name) ||
                  '_' + ' ' + data?.order?.OrderCustomer?.last_name ||
                  '_'}
              </span>
              <span>
                {(data?.order?.OrderShippingAddress &&
                  data?.order?.OrderShippingAddress?.shipping_address) ||
                  '_' +
                    ' ' +
                    data?.order?.OrderShippingAddress?.shipping_address2 ||
                  '_'}
              </span>
              <span>
                {data?.order?.OrderShippingAddress &&
                  `${data?.order?.OrderShippingAddress?.shipping_country || '_'}
                ${data?.order?.OrderShippingAddress?.shipping_city || '_'}
                ${data?.order?.OrderShippingAddress?.shipping_state || '_'}
                ${data?.order?.OrderShippingAddress?.shipping_zip || '_'}`}
              </span>
              <span>{data?.order?.OrderCustomer?.phone_number || '_'}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
OrderDetailsPage.Layout = Layout;

export const getServerSideProps = async () => ({
  props: {},
});
