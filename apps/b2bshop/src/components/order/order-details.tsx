import Heading from '@components/ui/heading';
import usePrice from '@framework/basic-rest/product/use-price';
import { OrderItem } from '@framework/basic-rest/types';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const OrderItemCard = ({ product }: { product: OrderItem }) => {
  const { price: itemTotal } = usePrice({
    amount: product.price * product.quantity,
    currencyCode: 'EUR',
  });
  const { price: unitPrice } = usePrice({
    amount: product.price,
    currencyCode: 'EUR',
  });
  return (
    <tr className='font-normal' key={product.id}>
      <td className='p-2 px-4 md:pl-8 '>{product.name}</td>
      <td className='p-2 px-4 md:pl-8 '>{product.quantity}</td>
      <td className='p-2 px-4 md:pl-8 '>{unitPrice}</td>
      <td className='p-2 px-4 md:pl-8 '>{itemTotal}</td>
    </tr>
  );
};

const OrderDetails: React.FC<{ className?: string }> = ({
  className = 'pt-3',
}) => {
  const { t } = useTranslation('common');
  const {
    query: { id },
  } = useRouter();

  const order = {
    order_lexir_id_order_shipping_address: 20220802,
    orderCustomerEmail: 'manos@bonhomie.paris',
    date: 'April 22, 2021',
    total: 30,
    price: 30,
    shipping_fee: 17,
    payment_gateway: 'Cash on delivery',
    products: [
      {
        id: 10,
        name: 'Product 1',
        price: 15,
        quantity: 1,
      },
      {
        id: 16,
        name: 'Product 16',
        price: 15,
        quantity: 1,
      },
    ],
  };

  const { price: subtotal } = usePrice(
    order && {
      amount: order.total,
      currencyCode: 'USD',
    }
  );
  const { price: total } = usePrice(
    order && {
      amount: order.shipping_fee
        ? order.total + order.shipping_fee
        : order.total,
      currencyCode: 'USD',
    }
  );
  const { price: shipping } = usePrice(
    order && {
      amount: order.shipping_fee,
      currencyCode: 'USD',
    }
  );

  return (
    <div className={className}>
      <table className='w-full text-sm font-bold text-brand-dark lg:text-base'>
        <thead>
          <tr>
            <th className='w-9/12 bg-fill-secondary p-4 text-xl ltr:text-left ltr:first:rounded-tl-md rtl:text-right rtl:first:rounded-tr-md md:pl-8'>
              {'Subtotal'}
            </th>
            <th className='w-3/12 border-l bg-fill-secondary p-4 text-base font-normal ltr:text-left ltr:last:rounded-tr-md rtl:text-right rtl:last:rounded-tl-md md:pl-8'>
              {subtotal}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className=''>
            <td className='px-4 pt-3 md:pl-8'>{t('text-shipping')}:</td>
            <td className='px-4 pt-3 text-base font-normal md:pl-8'>
              {shipping}
              <span className='ltr:pl-1.5 rtl:pr-1.5'>via Flat rate</span>
            </td>
          </tr>
          <tr className=''>
            <td className='px-4 pt-2 md:pl-8'>{'VAT'}:</td>
            <td className='px-4 pt-2 text-base font-normal md:pl-8'>{'17%'}</td>
          </tr>
        </tbody>
      </table>

      <table className='mt-6 w-full text-sm font-bold text-brand-dark lg:text-base'>
        <thead>
          <tr>
            <th className='w-9/12 bg-fill-secondary p-4 text-xl ltr:text-left ltr:first:rounded-tl-md rtl:text-right rtl:first:rounded-tr-md md:pl-8'>
              {'Total'}
            </th>
            <th className='w-3/12 border-l bg-fill-secondary p-4 text-base font-normal ltr:text-left ltr:last:rounded-tr-md rtl:text-right rtl:last:rounded-tl-md md:pl-8'>
              {total}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className=''>
            <td className='px-4 pt-3 md:pl-8'>{'Payment method:'}</td>
            <td className='px-4 pt-3 text-base font-normal md:pl-8'>
              {order?.payment_gateway}
            </td>
          </tr>
        </tbody>
      </table>

      <div className='mt-16'>
        <Heading variant='heading' className='mb-6 px-4 md:pl-8'>
          {'Order Summary'}
        </Heading>

        <table className='w-full text-sm font-semibold text-brand-dark lg:text-base'>
          <thead>
            <tr className='divide-x'>
              <th className='w-6/12 bg-fill-secondary p-4 ltr:text-left ltr:first:rounded-tl-md rtl:text-right rtl:first:rounded-tr-md md:pl-8'>
                {'Product'}
              </th>
              <th className='w-2/12 bg-fill-secondary p-4 ltr:text-left ltr:last:rounded-tr-md rtl:text-right rtl:last:rounded-tl-md md:pl-8'>
                {'Quantity'}
              </th>
              <th className='w-2/12 bg-fill-secondary p-4 ltr:text-left ltr:last:rounded-tr-md rtl:text-right rtl:last:rounded-tl-md md:pl-8'>
                {'Unit Price'}
              </th>
              <th className='w-2/12 bg-fill-secondary p-4 ltr:text-left ltr:last:rounded-tr-md rtl:text-right rtl:last:rounded-tl-md md:pl-8'>
                {'Total'}
              </th>
            </tr>
          </thead>
          <tbody>
            {order?.products.map((product, index) => (
              <OrderItemCard key={index} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetails;
