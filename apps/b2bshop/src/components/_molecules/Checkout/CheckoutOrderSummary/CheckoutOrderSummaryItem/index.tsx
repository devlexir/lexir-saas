import { Suspense } from 'react';

type OrderSummaryItemType = {
  id: number;
  name: string;
  price: string;
};

export const CheckoutOrderSummaryItem: React.FC<{
  orderSummaryItem: OrderSummaryItemType;
}> = ({ orderSummaryItem }) => {
  return (
    <div className='flex w-full items-center py-2 text-sm font-bold text-brand-dark first:pt-8 md:py-1 md:text-xl'>
      <div className='w-full'>{orderSummaryItem.name}</div>
      <div>
        <div
          className={`shrink-0 text-base font-normal ltr:ml-auto rtl:mr-auto`}
        >
          <Suspense>{orderSummaryItem.price}</Suspense>
        </div>
      </div>
    </div>
  );
};
