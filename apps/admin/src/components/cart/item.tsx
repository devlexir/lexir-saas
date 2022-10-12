import { useTranslation } from 'next-i18next';
import Image from 'next/image';

import { CloseIcon } from '@components/icons/close-icon';
import Counter from '@components/ui/counter';

import { fadeInOut } from '@utils/motion/fade-in-out';
import usePrice from '@utils/use-price';

import { useCart } from '@contexts/quick-cart/cart.context';
import { motion } from 'framer-motion';

interface CartItemProps {
  item: any;
}

const CartItem = ({ item }: CartItemProps) => {
  const { t } = useTranslation('common');
  const { clearItemFromCart, addItemToCart, removeItemFromCart } = useCart();

  const { price } = usePrice({
    amount: item.price,
  });
  const { price: itemPrice } = usePrice({
    amount: item.itemTotal,
  });
  function handleIncrement(e: any) {
    console.log(e);
    addItemToCart(item, 1);
  }
  const handleRemoveClick = (e: any) => {
    console.log(e);
    e.stopPropagation();
    removeItemFromCart(item.id);
  };
  return (
    <motion.div
      layout
      initial='from'
      animate='to'
      exit='from'
      variants={fadeInOut(0.25)}
      className='flex items-center border-b border-solid border-border-200 border-opacity-75 py-4 px-4 text-sm sm:px-6'
    >
      <div className='flex-shrink-0'>
        <Counter
          value={item.quantity}
          onDecrement={handleRemoveClick}
          onIncrement={handleIncrement}
          variant='pillVertical'
          // disabled={outOfStock}
        />
      </div>

      <div className='mx-4 bg-gray-100'>
        <div className='relative my-2 flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden bg-gray-100 px-4 py-2 sm:h-16 sm:w-16'>
          <Image
            src={item?.imageSRC ?? '/'}
            alt={item.name}
            layout='fill'
            objectFit='contain'
          />
        </div>
      </div>
      <div>
        <h3 className='font-bold text-heading'>{item.name}</h3>
        <p className='my-2.5 font-semibold text-accent'>{price}</p>
        <span className='text-xs text-body'>
          {item.quantity} X {item.unit}
        </span>
      </div>
      <span className='font-bold text-heading ms-auto'>{itemPrice}</span>
      <button
        className='flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-muted transition-all duration-200 -me-2 ms-3 hover:bg-gray-100 hover:text-red-600 focus:bg-gray-100 focus:text-red-600 focus:outline-none'
        onClick={() => clearItemFromCart(item.id)}
      >
        <span className='sr-only'>{t('text-close')}</span>
        <CloseIcon className='h-3 w-3' />
      </button>
    </motion.div>
  );
};

export default CartItem;
