import moment from 'moment';

import { useModalAction } from '@components/ui/modal/modal.context';

const OrderCard = ({ order }: any) => {
  const { id, order_id, OrderDetail, OrderCustomer } = order ?? {};

  const { openModal } = useModalAction();

  function handleVariableProduct() {
    return openModal('MOBILE_ORDER_OPEN', id);
  }

  return (
    <div
      onClick={handleVariableProduct}
      className='my-4 flex h-[202] overflow-hidden rounded-lg border border-[#E7E7E7] p-4 shadow-sm transition-all duration-200 '
    >
      <div className='max-w-[345px] rounded-lg bg-white p-4'>
        {/* A row that consists of two columns each containing a group of two contents. */}
        <div className='flex flex-row pt-1'>
          <div className='grid grid-cols-2 gap-x-4 gap-y-5'>
            <div className='flex flex-col gap-y-3'>
              <h3 className='overflow-hidden text-ellipsis text-base font-black text-[#2D2D2D]'>
                Order
              </h3>
              <span className='overflow-hidden text-ellipsis text-base font-normal text-[#4F4F4F]'>
                {`#${order_id}`}
              </span>
            </div>

            <div className='flex flex-col gap-y-3'>
              <h3 className='overflow-hidden text-ellipsis text-base font-black text-[#2D2D2D]'>
                Order Date
              </h3>
              <span className='overflow-hidden text-ellipsis text-base font-normal text-[#4F4F4F]'>
                {moment(OrderDetail.order_date).format('DD/MM/YYYY')}
              </span>
            </div>
            <div className='flex flex-col gap-y-3'>
              <h3 className='overflow-hidden text-ellipsis text-base font-black text-[#2D2D2D]'>
                Order Value
              </h3>
              <span className='overflow-hidden text-ellipsis text-base font-normal text-[#4F4F4F]'>
                {`€ ${OrderDetail?.total.toFixed(2)}`}
              </span>
            </div>

            <div className='flex flex-col gap-y-3'>
              <h3 className='overflow-hidden text-ellipsis text-base font-black text-[#2D2D2D]'>
                Customer
              </h3>
              <span className='overflow-hidden text-ellipsis text-base font-normal text-[#4F4F4F]'>
                {OrderCustomer.customer_type &&
                OrderCustomer.customer_type === 'B2C'
                  ? OrderCustomer.first_name + ' ' + OrderCustomer.last_name
                  : OrderCustomer.account_name}
              </span>
            </div>
            <div className='flex flex-col gap-y-3'>
              <h3 className='overflow-hidden text-ellipsis text-base font-black text-[#2D2D2D]'>
                Customer Type
              </h3>
              <span className='overflow-hidden text-ellipsis text-base font-normal text-[#4F4F4F]'>
                {OrderCustomer.customer_type}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
