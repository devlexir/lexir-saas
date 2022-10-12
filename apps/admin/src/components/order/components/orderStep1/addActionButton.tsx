import { AddToCartIcon } from '@components/icons/add-to-cart';

import { cartAnimation } from '@utils/cart-animation';

import { useCart } from '@contexts/quick-cart/cart.context';

type Props = {
  id: string;
  item: Item;
};

interface Item {
  id: string | number;
  name: string;
  slug: string;
  image: {
    thumbnail: string;
    [key: string]: unknown;
  };
  price: number;
  sale_price?: number;
  quantity?: number;
  [key: string]: unknown;
}

const AddActionButton = ({ item }: Props) => {
  const { addItemToCart, isInCart } = useCart();
  const handleAddClick = (
    e: React.MouseEvent<HTMLButtonElement | MouseEvent>
  ) => {
    addItemToCart(item, 1);
    if (!isInCart(item.id)) {
      cartAnimation(e);
    }
  };

  return (
    <div className='space-s-5 inline-flex items-center w-auto'>
      <button
        onClick={handleAddClick}
        className='text-red-500 transition duration-200 hover:text-red-600 focus:outline-none'
      >
        <AddToCartIcon width={20} />
      </button>
    </div>
  );
};

export default AddActionButton;
