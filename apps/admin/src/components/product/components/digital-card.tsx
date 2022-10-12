import { useTranslation } from 'next-i18next';
import Image from 'next/image';

import { AddToCart } from '@components/cart/add-to-cart/add-to-cart';

import { productPlaceholder } from '@utils/placeholders';
import usePrice from '@utils/use-price';

import { Product } from '@ts-types/generated';

interface Props {
  item: Product;
}

const ProductCard = ({ item }: Props) => {
  const { t } = useTranslation();
  const { name, imageSRC, shop, quantity, price, sale_price } = item ?? {};

  const {
    price: currentPrice,
    basePrice,
    discount,
  } = usePrice({
    amount: sale_price ? sale_price : price!,
    baseAmount: price ?? 0,
  });

  return (
    <div className='h-full overflow-hidden transition-all duration-200 border rounded shadow-sm cart-type-neon border-border-200 bg-light hover:shadow-md'>
      <div className='relative flex items-center justify-center w-auto product-thumbnail p-4'>
        <span className='sr-only'>{t('text-product-image')}</span>
        <Image
          src={imageSRC ?? productPlaceholder}
          alt={name}
          width='100px'
          height='300px'
          className='product-image '
        />
        {discount && (
          <div className='absolute top-3 end-3 md:top-4 md:end-4 rounded text-xs leading-6 font-semibold px-1.5 sm:px-2 md:px-2.5 bg-accent text-light'>
            {discount}
          </div>
        )}
      </div>

      <header className='p-3 md:p-6'>
        <div className='flex items-start justify-between mb-5'>
          <div className='flex flex-shrink-0'>
            <Image
              width={32}
              height={32}
              alt={shop?.name ?? ''}
              src={shop?.logo?.thumbnail ?? '/'}
              className='rounded-full'
            />
          </div>

          <div className='-mt-[1px] mr-auto flex flex-col truncate pl-2.5'>
            <h3
              title={name}
              className='mb-0.5 text-[13px] truncate font-semibold'
            >
              {name}
            </h3>
            <span className='text-[13px] font-semibold text-gray-500'>
              {shop?.name}
            </span>
          </div>

          <div className='flex flex-shrink-0 flex-col items-end pl-2.5'>
            {basePrice && (
              <del className='px-1 font-medium text-[13px] text-dark-900 dark:text-dark-700'>
                {basePrice}
              </del>
            )}
            <div className='flex items-center mb-2'>
              <span className='rounded-2xl px-1.5 py-0.5 text-[13px] font-bold uppercase text-accent bg-gray-100'>
                {currentPrice}
              </span>
              {basePrice && (
                <del className='md:text-[13px] text-muted ms-2'>
                  {basePrice}
                </del>
              )}
            </div>
          </div>
        </div>
        {Number(quantity) > 0 && <AddToCart variant='neon' data={item} />}

        {Number(quantity) <= 0 && (
          <div className='px-2 py-1 text-xs bg-red-500 rounded text-light'>
            Out of Stock
          </div>
        )}
      </header>
    </div>
  );
};

export default ProductCard;
