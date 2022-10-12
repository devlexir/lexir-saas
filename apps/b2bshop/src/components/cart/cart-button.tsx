import CartIcon from '@components/icons/cart-icon';
import { useCart } from '@contexts/cart/cart.context';
import { useUI } from '@contexts/ui.context';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';

type CartButtonProps = {
  className?: string;
  iconClassName?: string;
  hideLabel?: boolean;
  isShowing?: boolean;
};

const CartButton: React.FC<CartButtonProps> = ({
  className,
  iconClassName = 'text-brand-dark',
  hideLabel,
  isShowing,
}) => {
  const { t } = useTranslation('common');
  const { openDrawer, setDrawerView } = useUI();
  const { totalItems } = useCart();
  function handleCartOpen() {
    setDrawerView('CART_SIDEBAR');
    isShowing;
    return openDrawer();
  }

  return (
    <button
      className={cn(
        'flex h-auto shrink-0 transform items-center justify-center gap-x-2 focus:outline-none',
        className
      )}
      onClick={handleCartOpen}
      aria-label='cart-button'
    >
      <div className='relative flex items-center'>
        <CartIcon className={cn(iconClassName)} />
        {totalItems > 0 ? (
          <span className='absolute -top-2.5 flex min-h-[20px] min-w-[20px] items-center justify-center rounded-[20px] bg-brand p-0.5 text-10px font-bold text-brand-light ltr:left-2.5 rtl:right-2.5'>
            {totalItems}
          </span>
        ) : null}
      </div>
      {!hideLabel && (
        <span className='text-sm font-normal text-brand-dark lg:text-15px'>
          {'CART'}
        </span>
      )}
    </button>
  );
};

export default CartButton;
