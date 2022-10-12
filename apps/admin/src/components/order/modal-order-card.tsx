import moment from 'moment';

import Loader from '@components/ui/loader/loader';

import { useOrderQuery } from '@data/order/use-order.query';

const OrderCard = ({ order }: any) => {
  const {
    orderItem,
    orderPayment,
    orderDetail,
    orderCustomer,
    orderShippingAddress,
  } = order.order ?? {};

  // ** Totals Calculations ** //

  const qtyTotal =
    orderItem &&
    orderItem.reduce(function (sum: any, b: any) {
      return parseFloat(sum) + parseFloat(b.qty);
    }, 0);

  const subTotal =
    orderItem &&
    orderItem.reduce(function (sum: any, b: any) {
      return parseFloat(sum) + parseFloat(b.total);
    }, 0);

  const priceDiscount =
    orderItem &&
    orderItem.reduce(function (sum: any, b: any) {
      return parseFloat(sum) + parseFloat(b.price_w_discount);
    }, 0);

  const priceVat =
    orderItem &&
    orderItem.reduce(function (sum: any, b: any) {
      return parseFloat(sum) + parseFloat(b.price_w_vat);
    }, 0);

  const total = subTotal - priceDiscount + priceVat;

  // ** END Totals Calculations ** //

  return (
    <div className='bg-white p-4 w-[95vw] max-w-md rounded-lg'>
      {orderItem.length > 0 ? (
        <div className='pt-8'>
          {orderItem.map((item: any) => (
            <div className='grid grid-cols-3 w-full justify-between mb-3 pb-2 border-b'>
              <div className='flex flex-col gap-2'>
                <div className='text-xs text-[#6F6F6F]'>
                  {` Product ${orderItem.indexOf(item) + 1}`}
                </div>
                <div className='text-base text-[#4F4F4F] font-semibold '>
                  {item.product_name}
                </div>
              </div>
              <div className='flex flex-col items-end gap-2'>
                <div className='text-xs text-[#6F6F6F]'>Qty (un)</div>
                <div className='text-base text-[#4F4F4F] font-semibold '>
                  {item.qty}
                </div>
              </div>
              <div className='flex flex-col items-end gap-2'>
                <div className='text-xs text-[#6F6F6F]'>Price</div>
                <div className='text-base text-[#4F4F4F] font-semibold '>{`€ ${item.unit_price}`}</div>
              </div>
            </div>
          ))}
          <div className='grid grid-cols-3 w-full justify-between mb-3'>
            <div className='flex flex-col gap-2'>
              <div className='text-[#4F4F4F]'>Subtotal</div>
              <div className='text-[#4F4F4F]'>Discount</div>
              <div className='text-[#4F4F4F]'>VAT (20%)</div>
              <div className='text-xl text-[#1C8C64] font-semibold'>Total</div>
            </div>
            <div className='flex flex-col items-end gap-2'>
              <div className='text-[#4F4F4F]'>{qtyTotal}</div>
            </div>
            <div className='flex flex-col items-end gap-2'>
              <div className='text-[#4F4F4F]'>{`€ ${subTotal.toFixed(2)}`}</div>
              <div className='text-[#4F4F4F]'>
                {`- € ${priceDiscount.toFixed(2)}`}
              </div>
              <div className='text-[#4F4F4F]'>
                {`+ € ${priceVat.toFixed(2)}`}
              </div>
              <div className='text-xl	text-[#1C8C64] font-semibold'>
                {`€ ${total.toFixed(2)}`}
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {/* A row that consists of two columns each containing a group of two contents. */}
      <div className='flex flex-row pt-8'>
        <div className='flex flex-row pt-1'>
          <div className='grid grid-cols-2 gap-x-4 gap-y-5'>
            <div className='flex flex-col gap-y-3'>
              <h3 className='text-base font-black text-ellipsis overflow-hidden text-[#2D2D2D]'>
                Order Date
              </h3>
              <span className='text-base font-normal text-ellipsis overflow-hidden text-[#4F4F4F]'>
                {moment(orderDetail.order_date).format('DD/MM/YYYY')}
              </span>
            </div>
            <div className='flex flex-col gap-y-3'>
              <h3 className='text-base font-black text-ellipsis overflow-hidden text-[#2D2D2D]'>
                Order Value
              </h3>
              <span className='text-base font-normal text-ellipsis overflow-hidden text-[#4F4F4F]'>
                {`€ ${orderDetail.total.toFixed(2)}`}
              </span>
            </div>

            <div className='flex flex-col gap-y-3'>
              <h3 className='text-base font-black text-ellipsis overflow-hidden text-[#2D2D2D]'>
                Customer
              </h3>
              <span className='text-base font-normal text-ellipsis overflow-hidden text-[#4F4F4F]'>
                {orderCustomer.customer_type &&
                orderCustomer.customer_type === 'B2C'
                  ? orderCustomer.first_name + ' ' + orderCustomer.last_name
                  : orderCustomer.account_name}
              </span>
            </div>
            <div className='flex flex-col gap-y-3'>
              <h3 className='text-base font-black text-ellipsis overflow-hidden text-[#2D2D2D]'>
                Customer Type
              </h3>
              <span className='text-base font-normal text-ellipsis overflow-hidden text-[#4F4F4F]'>
                {orderCustomer.customer_type}
              </span>
            </div>

            <div className='flex flex-col gap-y-3'>
              <h3 className='text-base font-black text-ellipsis overflow-hidden text-[#2D2D2D]'>
                Shipping Address
              </h3>
              <span className='text-base font-normal text-ellipsis overflow-hidden text-[#4F4F4F]'>
                {orderShippingAddress.shipping_address +
                  ' ' +
                  orderShippingAddress.shipping_address2 +
                  ', '}
                {`${orderShippingAddress.shipping_city}, 
                ${orderShippingAddress.shipping_country},
                ${orderShippingAddress.shipping_state},
                ${orderShippingAddress.shipping_zip}`}
              </span>
            </div>
            <div className='flex flex-col gap-y-3'>
              <h3 className='text-base font-black text-ellipsis overflow-hidden text-[#2D2D2D]'>
                Payment Method
              </h3>
              <span className='text-base font-normal text-ellipsis overflow-hidden text-[#4F4F4F]'>
                {orderPayment.payment_method === 'bank_transfer' ||
                orderPayment.payment_method === 'bank-transfer'
                  ? 'Bank transfer'
                  : 'Credit Card'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderCardModal = ({ orderId }: { orderId: string }) => {
  const { data, isLoading: loading } = useOrderQuery(orderId);

  if (loading || !data) return <Loader text='Loading' />;
  return <OrderCard order={data} />;
};

export default OrderCardModal;
