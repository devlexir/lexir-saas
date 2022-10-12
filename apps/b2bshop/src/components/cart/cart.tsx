import CartItem from './cart-item';
import EmptyCart from './empty-cart';
import ChevronLeftIcon from '@components/icons/chevron-double-left';
import Heading from '@components/ui/heading';
import Link from '@components/ui/link';
import Scrollbar from '@components/ui/scrollbar';
import Text from '@components/ui/text';
import { useCart } from '@contexts/cart/cart.context';
import { useUI } from '@contexts/ui.context';
import usePrice from '@framework/basic-rest/product/use-price';
import { ROUTES } from '@utils/routes';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';

export default function Cart() {
  const { t } = useTranslation('common');
  const { closeDrawer } = useUI();
  const { items, total, isEmpty, resetCart } = useCart();
  const { price: cartTotal } = usePrice({
    amount: total,
    currencyCode: 'USD',
  });
  return (
    <div className='flex h-full w-full flex-col justify-between'>
      <div className='relative flex w-full items-center justify-between border-b border-border-base shadow-card pl-5 pr-5 md:pl-7 md:pr-7'>
        <div className='flex items-center gap-3'>
          <button
            className='flex items-center justify-center py-6 text-2xl transition-opacity hover:opacity-60 focus:outline-none lg:py-6'
            onClick={closeDrawer}
            aria-label='close'
          >
            <ChevronLeftIcon />
          </button>
          <Heading variant='titleMedium' className='font-bold'>
            {'Shopping Cart'}
          </Heading>
        </div>
        <div className='flex items-center'>
          {!isEmpty && (
            <button
              className='flex flex-shrink items-center text-15px text-error-300 transition duration-150 ease-in hover:opacity-100 focus:outline-none ltr:-mr-1.5 rtl:-ml-1.5'
              aria-label={'Clear All'}
              onClick={resetCart}
            >
              <span className='ltr:pl-1 lg:rtl:pr-1 text-base'>
                {'Clear All'}
              </span>
            </button>
          )}
        </div>
      </div>
      {!isEmpty ? (
        <Scrollbar className='cart-scrollbar w-full flex-grow'>
          <div className='w-full pr-5 md:pr-7 pl-9'>
            <div className='flex w-full justify-between pt-6 md:pt-10'>
              <Heading>
                <span className='text-xl font-bold'>{'Product'}</span>
              </Heading>
              <Heading>
                <span className='text-xl font-bold'>{'Subtotal'}</span>
              </Heading>
            </div>
            {items?.map((item) => (
              <CartItem item={item} key={item.id} />
            ))}
          </div>
        </Scrollbar>
      ) : (
        <EmptyCart />
      )}
      <div className='border-t border-border-base px-5 pt-5 pb-5 md:px-7 md:pt-6 md:pb-6'>
        {!isEmpty && (
          <div className='flex flex-col  pb-5'>
            <div className='flex justify-between ltr:pr-3 rtl:pl-3'>
              <Heading className='mb-2.5 inline-block'>
                <span className='text-2xl font-bold'>{'Subtotal'}:</span>
              </Heading>

              <div className='-mt-0.5 min-w-[80px] inline-block shrink-0 text-xl font-bold text-brand-dark ltr:text-right rtl:text-left'>
                {cartTotal}
              </div>
            </div>
            <Text className='pr-3'>
              {
                'Final pricing including shipping and discount will be calculated at checkout.'
              }
            </Text>
          </div>
        )}
        <div className='flex flex-col' onClick={closeDrawer}>
          <Link
            href={isEmpty === false ? ROUTES.CHECKOUT : '/'}
            className={cn(
              'flex w-full items-center justify-center rounded bg-brand-dark px-5 py-3 text-sm font-semibold text-brand-light transition duration-300 hover:bg-opacity-90 focus:outline-none sm:text-15px md:py-3',
              {
                'cursor-not-allowed bg-fill-four !text-brand-dark !text-opacity-25 hover:bg-fill-four':
                  isEmpty,
              }
            )}
          >
            <span className='py-0.5 font-bold text-base'>
              {'Proceed to Checkout'}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
