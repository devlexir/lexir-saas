import usePrice from '@framework/basic-rest/product/use-price';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';

export default function VariationPrice({
  selectedVariation,
  minPrice,
  maxPrice,
}: any) {
  const { t } = useTranslation('common');
  const { price, basePrice, discount } = usePrice(
    selectedVariation && {
      amount: selectedVariation.sale_price
        ? selectedVariation.sale_price
        : selectedVariation.price,
      baseAmount: selectedVariation.price,
      currencyCode: 'USD',
    }
  );
  const { price: min_price } = usePrice({
    amount: minPrice,
    currencyCode: 'USD',
  });
  const { price: max_price } = usePrice({
    amount: maxPrice,
    currencyCode: 'USD',
  });
  return (
    <div className='mt-5 flex items-center'>
      <div className='text-base font-bold text-brand-dark md:text-xl xl:text-[22px]'>
        {!isEmpty(selectedVariation)
          ? `${price}`
          : `${min_price} - ${max_price}`}
      </div>
      {discount && (
        <>
          <del className='text-sm text-brand-dark text-opacity-50 ltr:pl-3 rtl:pr-3 md:text-15px'>
            {basePrice}
          </del>
          <span className='inline-block rounded bg-brand-tree bg-opacity-20 px-2 py-1 text-xs font-bold uppercase text-brand-tree ltr:ml-2.5 rtl:mr-2.5 md:text-sm'>
            {discount} {t('text-off')}
          </span>
        </>
      )}
    </div>
  );
}
