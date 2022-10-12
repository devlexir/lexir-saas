import PlusProductCard from '@components/icons/plus-product-card';
import Counter from '@components/ui/counter';
import { useCart } from '@contexts/cart/cart.context';
import { generateCartItem } from '@utils/generate-cart-item';
import useWindowSize from '@utils/use-window-size';

interface Props {
  data: any;
  variation?: any;
  disabled?: boolean;
}
const AddToCart = ({ data, variation, disabled }: Props) => {
  const { width } = useWindowSize();
  const {
    addItemToCart,
    removeItemFromCart,
    isInStock,
    getItemFromCart,
    isInCart,
  } = useCart();
  const item = generateCartItem(data!, variation);
  const handleAddClick = (
    e: React.MouseEvent<HTMLButtonElement | MouseEvent>
  ) => {
    e.stopPropagation();
    addItemToCart(item, 1);
  };
  const handleRemoveClick = (e: any) => {
    e.stopPropagation();
    removeItemFromCart(item.id);
  };
  const outOfStock = isInCart(item?.id) && !isInStock(item.id);
  const iconSize = width! > 480 ? '19' : '19';
  return !isInCart(item?.id) ? (
    <button
      className='flex items-center justify-center rounded-full text-4xl text-brand-light focus:outline-none'
      aria-label='Count Button'
      onClick={handleAddClick}
      disabled={disabled || outOfStock}
    >
      <PlusProductCard width={iconSize} height={iconSize} opacity='1' />
    </button>
  ) : (
    <Counter
      value={getItemFromCart(item.id).quantity}
      onDecrement={handleRemoveClick}
      onIncrement={handleAddClick}
      disabled={outOfStock}
      className='w-full'
    />
  );
};

export default AddToCart;
