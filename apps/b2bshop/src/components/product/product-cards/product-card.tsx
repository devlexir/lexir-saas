import { useModalAction } from '@components/common/modal/modal.context';
import PlusProductCard from '@components/icons/plus-product-card';
import Image from '@components/ui/image';
import { useCart } from '@contexts/cart/cart.context';
import usePrice from '@framework/basic-rest/product/use-price';
import { Product } from '@framework/basic-rest/types';
import useWindowSize from '@utils/use-window-size';
import cn from 'classnames';
import dynamic from 'next/dynamic';

const AddToCart = dynamic(() => import('@components/product/add-to-cart'), {
  ssr: false,
});

interface ProductProps {
  product: Product;
  className?: string;
}
function RenderPopupOrAddToCart({ data }: { data: Product }) {
  const { id, quantity, product_type } = data ?? {};
  const { width } = useWindowSize();
  const { openModal } = useModalAction();
  const { isInCart, isInStock } = useCart();
  const iconSize = width! > 1024 ? '20' : '20';
  const outOfStock = isInCart(id) && !isInStock(id);
  function handlePopupView() {
    openModal('PRODUCT_VIEW', data);
  }
  if (Number(quantity) < 1 || outOfStock) {
    return (
      <span className='mx-0.5 inline-block rounded-full bg-brand-danger px-2.5 pt-1 pb-[3px] text-[11px] font-bold uppercase text-brand-light sm:mx-1 md:text-xs'>
        {'Out of Stock'}
      </span>
    );
  }
  if (product_type === 'variable') {
    return (
      <button
        className='inline-flex items-center justify-center text-4xl text-brand-light focus:outline-none focus-visible:outline-none '
        aria-label='Count Button'
        onClick={handlePopupView}
      >
        <PlusProductCard width={iconSize} height={iconSize} opacity='1' />
      </button>
    );
  }
  return <AddToCart data={data} />;
}
const ProductCard: React.FC<ProductProps> = ({ product, className }) => {
  const { name } = product ?? {};
  const { openModal } = useModalAction();

  const { price } = usePrice({
    amount: product?.sale_price ? product?.sale_price : product?.price,
    baseAmount: product?.price,
    currencyCode: 'EUR',
  });
  function handlePopupView() {
    openModal('PRODUCT_VIEW', product);
  }
  return (
    <article
      className={cn(
        'group relative flex h-[309px] cursor-pointer flex-col overflow-hidden rounded-sm shadow-card transition-all duration-300 hover:shadow-cardHover',
        className
      )}
      onClick={handlePopupView}
      title={name}
    >
      <div className='relative  bg-fill-thumbnail'>
        <div className='relative mx-auto flex h-[233px] max-w-[197px] transform justify-center overflow-hidden bg-fill-thumbnail transition duration-200 ease-in-out group-hover:scale-105'>
          <div className='flex items-center justify-center'>
            <Image
              //@ts-ignore
              src={
                product?.imageSRC
                  ? product?.imageSRC
                  : '/assets/images/products/packshot-kiss-my-rhubarbkiss-my.svg'
              }
              alt={name || 'Product Image'}
              layout='intrinsic'
              width={'1200w'}
              height={'1200h'}
              quality={100}
              className='bg-fill-thumbnail'
            />
          </div>
        </div>
      </div>
      <div className='flex h-[76px] flex-col bg-white p-3 transition duration-200 ease-in-out group-hover:scale-105'>
        <div className='flex justify-between pb-2'>
          <p className='truncate text-13px font-black uppercase leading-5 text-brand-dark sm:text-sm sm:leading-6 lg:text-15px'>
            {name}
          </p>
          <span className='text-sm font-semibold text-fill-six sm:text-15px lg:text-base'>
            {price}
          </span>
        </div>
        <div className=' flex items-center justify-between text-sm font-bold uppercase text-fill-five'>
          {'RUM'}
          <RenderPopupOrAddToCart data={product} />
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
