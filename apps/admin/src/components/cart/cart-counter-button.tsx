import CartCheckBagIcon from '@components/icons/cart-check-bag';

import { formatString } from '@utils/format-string';
import usePrice from '@utils/use-price';

import { useCart } from '@contexts/quick-cart/cart.context';
import { useUI } from '@contexts/ui.context';

const CartCounterButton = () => {
  const { totalUniqueItems, total } = useCart();
  const { openCartSidebar } = useUI();
  const { price: totalPrice } = usePrice({
    amount: total,
  });

  if (totalUniqueItems > 0) {
    return (
      <button
        className='product-cart shadow-900 fixed top-44 z-[40] -mt-12 flex flex-col items-center justify-center rounded bg-accent p-3 pt-3.5 text-sm font-semibold text-light transition-colors duration-200 end-0 rounded-te-none rounded-be-none hover:bg-accent-hover focus:outline-none'
        onClick={openCartSidebar}
      >
        <span className='flex pb-0.5'>
          <CartCheckBagIcon className='flex-shrink-0' width={14} height={16} />
          <span className='flex ms-2'>
            {formatString(totalUniqueItems, 'item')}
          </span>
        </span>
        <span className='mt-3 w-full rounded bg-light py-2 px-2 text-accent'>
          {totalPrice}
        </span>
      </button>
    );
  } else {
    return <></>;
  }
};

export default CartCounterButton;
