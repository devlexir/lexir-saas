import XIcon from '@components/icons/x-vector';
import Counter from '@components/ui/counter';
import Image from '@components/ui/image';
import Link from '@components/ui/link';
import { useCart } from '@contexts/cart/cart.context';
import usePrice from '@framework/basic-rest/product/use-price';
import { ROUTES } from '@utils/routes';

type CartItemProps = {
  item: any;
};

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { isInStock, addItemToCart, removeItemFromCart, clearItemFromCart } =
    useCart();
  const { price: totalPrice } = usePrice({
    amount: item?.itemTotal,
    currencyCode: 'EUR',
  });
  const { price: itemPrice } = usePrice({
    amount: item?.price,
    currencyCode: 'EUR',
  });
  const outOfStock = !isInStock(item.id);
  return (
    <div
      className={`group relative flex h-auto w-full items-center justify-start border-b border-border-one pb-7 pt-14 text-brand-light last:border-b-0`}
      title={item?.name}
    >
      <div className='relative flex shrink-0 cursor-pointer -ml-8 -mr-4 overflow-hidden rounded h-[120px] w-[120px]'>
        <Image
          src={item?.imageSRC ?? '/assets/placeholder/cart-item.svg'}
          width={100}
          height={100}
          loading='eager'
          alt={item.name || 'Product Image'}
        />
      </div>

      <div className='flex w-full items-start justify-between overflow-hidden'>
        <div className='ltr:pl-3 rtl:pr-3 md:ltr:pl-4 md:rtl:pr-4'>
          <Link
            href={`${ROUTES.PRODUCT}/${item?.slug}`}
            className='block text-base font-bold text-brand-dark transition-all hover:text-brand '
          >
            {item?.name}
          </Link>
          <div className='mt-3 mb-5 block text-brand-dark'>{`${item?.size} ml - €${item.price} each`}</div>
          <Counter
            value={item.quantity}
            onIncrement={() => addItemToCart(item, 1)}
            onDecrement={() => removeItemFromCart(item.id)}
            variant='cart'
            disabled={outOfStock}
          />
        </div>

        <div className='flex min-w-[65px] shrink-0 justify-end text-sm font-normal leading-5 text-brand-dark md:min-w-[80px] md:text-base'>
          {totalPrice}
        </div>
        <div
          className='hover absolute right-0 top-6 text-brand-muted transition duration-200 ease-in-out hover:bg-fill-four'
          onClick={() => clearItemFromCart(item.id)}
          role='button'
        >
          <XIcon />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
