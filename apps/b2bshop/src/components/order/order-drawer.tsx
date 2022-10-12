import { OrderDetailsContent } from './order-details-content';
import { formatAddress } from '@utils/format-address';
import Heading from '@components/ui/heading';
import { IoClose } from 'react-icons/io5';
import OrderStatus from './order-status';
import { useTranslation } from 'next-i18next';
import {
  DiscountPrice,
  DeliveryFee,
  TotalPrice,
  SubTotalPrice,
  Vat,
} from '@components/order/price';

import { useUI } from '@contexts/ui.context';

const OrderDrawer: React.FC = () => {
  const { t } = useTranslation('common');
  const { data, closeDrawer } = useUI();
  let { shipping_address } = data;

  return (
    <>
      {data !== '' && (
        <>
          <div className='block'>
            <div className='relative flex w-full items-center justify-between border-b border-border-base ltr:pl-5 rtl:pr-5 md:ltr:pl-7 md:rtl:pr-7'>
              <Heading variant='titleMedium'>
                {t('text-order-details')}:
              </Heading>
              <button
                className='flex items-center justify-center px-4 py-6 text-2xl text-brand-dark transition-opacity hover:opacity-60 focus:outline-none md:px-6 lg:py-7'
                onClick={closeDrawer}
                aria-label='close'
              >
                <IoClose />
              </button>
            </div>
            <div className='p-5 md:p-8'>
              <div className='mb-3 text-[14px] text-brand-dark opacity-70'>
                {t('text-delivery-address')}
              </div>
              <div className='min-h-[90px]  py-4 text-[12px] md:text-[14px]'>
                <p className='text-brand-dark opacity-70'>
                  {formatAddress(shipping_address)}
                </p>
              </div>
              <OrderStatus status={data?.status?.serial} />
              <div className='grid grid-cols-12 rounded-[3px] bg-fill-base py-3 text-[12px] text-brand-dark/70 md:text-[14px]'>
                <div className='col-span-2'></div>
                <div className='col-span-5'>Items Name</div>
                <div className='col-span-3 text-center md:ltr:text-left md:rtl:text-right'>
                  Quantity
                </div>
                <div className='col-span-2'>Price</div>
              </div>
              {data?.products?.map((item: any, index: string) => (
                <OrderDetailsContent key={index} item={item} />
              ))}
              <div className='mt-3 ltr:text-right rtl:text-left'>
                <div className='inline-flex flex-col text-[12px] text-black md:text-[14px]'>
                  <div className='mb-2 border-b border-border-base pb-1 ltr:pl-20 rtl:pr-20'>
                    <p className='mb-1 flex justify-between'>
                      <span className='ltr:mr-8 rtl:ml-8'>Sub total: </span>
                      <span className='font-medium'>
                        <SubTotalPrice items={data?.products} />
                      </span>
                    </p>
                    {/* {typeof data?.discount === 'number' && (
                      <p className='mb-2 flex justify-between'>
                        <span className='ltr:mr-8 rtl:ml-8'>Discount: </span>
                        <span className='font-medium'>
                          <DiscountPrice discount={data?.discount} />
                        </span>
                      </p>
                    )} */}
                    {typeof data?.delivery_fee === 'number' && (
                      <p className='mb-2 flex justify-between'>
                        <span className='ltr:mr-8 rtl:ml-8'>Delivery Fee:</span>
                        <span className='font-medium'>
                          <DeliveryFee delivery={data?.delivery_fee} />
                        </span>
                      </p>
                    )}

                    {/* {typeof data?.vat === 'number' && ( */}
                    <p className='mb-2 flex justify-between'>
                      <span className='ltr:mr-8 rtl:ml-8'>VAT:</span>
                      <span className='font-medium'>
                        <Vat delivery={data?.vat} />
                      </span>
                    </p>
                    {/* )} */}
                  </div>
                  <p className='mb-2 flex justify-between ltr:pl-20 rtl:pr-20'>
                    <span className='ltr:mr-8 rtl:ml-8'>Total Cost:</span>
                    <span className='font-medium'>
                      <TotalPrice items={data} />
                    </span>
                  </p>
                </div>
              </div>
              <div className='mt-12 ltr:text-right rtl:text-left'>
                <span className='inline-block cursor-pointer rounded border border-solid border-[#DEE5EA] bg-white py-3 px-5 text-[12px] font-medium capitalize text-black transition-all hover:border-[#F35C5C] hover:bg-[#F35C5C] hover:text-white ltr:mr-4 rtl:ml-4 md:text-[14px]'>
                  Report order
                </span>
                <span
                  onClick={closeDrawer}
                  className='inline-block cursor-pointer rounded border border-solid border-[#F35C5C] bg-[#F35C5C] py-3 px-5 text-[12px] font-medium capitalize text-white  transition-all hover:border-[#DEE5EA] hover:bg-white hover:text-black md:text-[14px]'
                >
                  Cancel order
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderDrawer;
