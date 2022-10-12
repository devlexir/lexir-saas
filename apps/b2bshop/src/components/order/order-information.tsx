import { CheckOkIcon } from '@components/icons/check-ok-icon';
import OrderDetails from '@components/order/order-details';
import { useRouter } from 'next/router';

export default function OrderInformation() {
  const {
    query: { id },
  } = useRouter();

  const orderData = {
    order_lexir_id_order_shipping_address: 20220802,
    orderCustomerEmail: 'manos@bonhomie.paris',
    date: 'April 22, 2021',
    total: 30,
    price: 30,
  };

  const orderDataHeader = [
    {
      title: 'Order number',
      data: orderData?.order_lexir_id_order_shipping_address,
    },
    { title: 'Date', data: orderData.date },
    { title: 'Email', data: orderData.orderCustomerEmail },
    { title: 'TotaL', data: '€' + orderData.total },
    { title: 'Payment Method', data: 'Cash on delivery' },
  ];

  return (
    <div className='py-10 px-20 xl:px-24'>
      <div className='mb-6 flex items-center justify-start rounded-md border border-border-base bg-brand-green-card px-4 py-4 text-sm text-brand-dark md:text-base lg:mb-8 lg:px-5'>
        <span className='flex h-10 w-10 shrink-0 items-center justify-center ltr:mr-3 rtl:ml-3 lg:ltr:mr-4 lg:rtl:ml-4'>
          <CheckOkIcon className='h-5 w-5 text-brand' />
        </span>
        {'Thank you! Your order was placed successfully.'}
      </div>

      <ul className='mb-7 flex flex-col rounded-md border border-border-base bg-fill-secondary md:flex-row lg:mb-8 xl:mb-10'>
        {orderDataHeader.map((li) => (
          <li
            key={li.title}
            className='flex grow flex-col justify-center gap-2 border-b  border-border-two px-4 py-2 text-base text-brand-dark last:border-0 md:border-b-0 md:border-r lg:px-6 lg:text-lg xl:px-8'
          >
            <span className='flex justify-center text-base font-normal uppercase text-brand-muted-three'>
              {li.title}
            </span>
            <span className='flex text-base justify-center'>{li.data}</span>
          </li>
        ))}
      </ul>
      <OrderDetails />
    </div>
  );
}
