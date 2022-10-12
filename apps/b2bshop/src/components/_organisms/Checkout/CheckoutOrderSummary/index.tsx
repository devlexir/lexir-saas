/* =========================================================================================
........ Checkout Components
==========================================================================================*/
import { CheckoutOrderSummaryItem } from '@components/_molecules/Checkout/CheckoutOrderSummary/CheckoutOrderSummaryItem';

/* =========================================================================================
........ UI Components
==========================================================================================*/
import ThumbsUpIcon from '@components/icons/thumbs-up-icon';
import Link from '@components/ui/link';

/* =========================================================================================
........ Context, Utils
==========================================================================================*/
import usePrice from '@framework/basic-rest/product/use-price';
import { ROUTES } from '@utils/routes';
import dynamic from 'next/dynamic';

/* =========================================================================================
........ Hooks
==========================================================================================*/
import { useRouter } from 'next/router';
import { Suspense, useEffect, useState } from 'react';

const CheckoutProductItem = dynamic(
  () =>
    import(
      '@components/_molecules/Checkout/CheckoutOrderSummary/CheckoutProductItem'
    ),
  {
    ssr: false,
  }
);

// todo-jpcarvalho | Move this to types file
type PriceWithCurrency = {
  price: string;
};

// todo-jpcarvalho | Move this to types file
type OrderSummaryItemType = {
  id: number;
  name: string;
  price: string;
};

const CheckoutOrderSummary: React.FC = ({ items, total, isEmpty }: any) => {
  const router = useRouter();

  const { price: subtotal }: PriceWithCurrency = usePrice({
    amount: total,
    currencyCode: 'EUR',
  });

  const { price: shippingTotal }: PriceWithCurrency = usePrice({
    amount: 0,
    currencyCode: 'EUR',
  });

  const { price: vatTotal }: PriceWithCurrency = usePrice({
    amount: 0,
    currencyCode: 'EUR',
  });

  const { price: discountTotal }: PriceWithCurrency = usePrice({
    amount: 0,
    currencyCode: 'EUR',
  });

  const orderSummaryItens: OrderSummaryItemType[] = [
    {
      id: 1,
      name: 'Subtotal',
      price: subtotal,
    },
    {
      id: 2,
      name: 'Shipping',
      price: shippingTotal,
    },
    {
      id: 3,
      name: 'VAT (20%)',
      price: vatTotal,
    },
    {
      id: 4,
      name: 'Discount',
      price: discountTotal,
    },
    {
      id: 5,
      name: 'Total',
      price: subtotal,
    },
  ];

  return (
    <>
      <div className='rounded-md border border-border-base px-4 py-6 text-brand-light xl:px-7'>
        <div className='border-b pb-5'>
          <div className='text-heading rounded-md pb-6 text-sm font-bold text-brand-dark md:text-xl'>
            {'Order Summary'}
          </div>
          <div className='flex flex-row text-heading rounded-md text-sm font-bold text-brand-dark md:text-md'>
            <div className='w-4/6 sm:w-4/6 lg:w-2/6'>
              <span className='font-bold'>{'Product'}</span>
            </div>
            <div className='hidden sm:block sm:w-1/6 lg:w-2/6 text-right'>
              <span className='font-bold ltr:ml-auto rtl:mr-auto'>{'Qty'}</span>
            </div>
            <div className='w-2/6 sm:w-1/6 lg:w-2/6 text-right'>
              <span className='shrink-0 font-bold ltr:ml-auto rtl:mr-auto'>
                {'Subtotal'}
              </span>
            </div>
          </div>
        </div>

        {items.map((item: any) => (
          <CheckoutProductItem item={item} key={item.id} />
        ))}

        <div>
          {orderSummaryItens.map((item: any) => (
            <CheckoutOrderSummaryItem orderSummaryItem={item} key={item.id} />
          ))}
        </div>
      </div>

      <div className='mt-8'>
        <div className='flex gap-x-4'>
          <ThumbsUpIcon />
          <h3 className='text-base font-bold text-brand-dark'>{`Lexir's Promise`}</h3>
        </div>
      </div>
      <div className='mt-2'>
        <div className='text-base text-brand-dark'>
          {`If you're not absolutely satisfied with your Lexir order, we'll make it right or refund your purchase on unopened bottles - `}
          <Link
            href={ROUTES.TERMS}
            className='text-base font-bold text-brand-dark'
          >
            {`Cancellation and Returns.`}
          </Link>
        </div>
      </div>
    </>
  );
};

export default CheckoutOrderSummary;
