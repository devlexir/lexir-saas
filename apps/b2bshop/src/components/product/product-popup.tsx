import ProductDescription from './product-description';
import { productGalleryPlaceholder } from '@assets/placeholders';
import {
  useModalAction,
  useModalState,
} from '@components/common/modal/modal.context';
import ProductAttributes from '@components/product/product-attributes';
import Button from '@components/ui/button';
import ThumbnailCarousel from '@components/ui/carousel/thumbnail-carousel';
import CloseButton from '@components/ui/close-button';
import Counter from '@components/ui/counter';
import Heading from '@components/ui/heading';
import Image from '@components/ui/image';
import { useCart } from '@contexts/cart/cart.context';
import usePrice from '@framework/basic-rest/product/use-price';
import { getVariations } from '@framework/basic-rest/utils/get-variations';
import { generateCartItem } from '@utils/generate-cart-item';
import { ROUTES } from '@utils/routes';
import useWindowSize from '@utils/use-window-size';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function ProductPopup() {
  const { t } = useTranslation('common');
  const { data } = useModalState();
  const { width } = useWindowSize();
  const { closeModal } = useModalAction();
  const router = useRouter();
  const { addItemToCart, isInCart, getItemFromCart, isInStock } = useCart();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [addToWishlistLoader, setAddToWishlistLoader] =
    useState<boolean>(false);
  const { price, basePrice, discount } = usePrice({
    amount: data.sale_price ? data.sale_price : data.price,
    baseAmount: data.price,
    currencyCode: 'USD',
  });
  const variations = getVariations(data.variations);
  const { slug, gallery } = data;
  const isSelected = !isEmpty(variations)
    ? !isEmpty(attributes) &&
      Object.keys(variations).every((variation) =>
        attributes.hasOwnProperty(variation)
      )
    : true;
  let selectedVariation: any = {};
  if (isSelected) {
    selectedVariation = data?.variation_options?.find((o: any) =>
      isEqual(
        o.options.map((v: any) => v.value).sort(),
        Object.values(attributes).sort()
      )
    );
  }
  const item = generateCartItem(data, selectedVariation);
  const outOfStock = isInCart(item.id) && !isInStock(item.id);
  function addToCart() {
    if (!isSelected) return;
    setAddToCartLoader(true);
    setTimeout(() => {
      setAddToCartLoader(false);
    }, 1500);
    addItemToCart(item, selectedQuantity);
    toast(t('text-added-bag'), {
      progressClassName: 'fancy-progress-bar',
      position: width! > 768 ? 'bottom-right' : 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
  function addToWishlist() {
    setAddToWishlistLoader(true);
    setFavorite(!favorite);
    const toastStatus: string =
      favorite === true ? t('text-remove-favorite') : t('text-added-favorite');
    setTimeout(() => {
      setAddToWishlistLoader(false);
    }, 1500);
    toast(toastStatus, {
      progressClassName: 'fancy-progress-bar',
      position: width! > 768 ? 'bottom-right' : 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }

  function navigateToProductPage() {
    closeModal();
    router.push(`${ROUTES.PRODUCT}/${slug}`);
  }

  useEffect(() => setSelectedQuantity(1), [data.id]);

  return (
    <div className='mx-auto rounded-md bg-brand-light md:w-[600px] lg:w-[940px] xl:w-[1180px] 2xl:w-[1360px]'>
      <CloseButton onClick={closeModal} />
      <div className='overflow-auto md:overflow-visible'>
        <div className='px-4 pb-5 pt-10 md:px-10 md:pb-10 md:pt-24'>
          <div className='items-start justify-between lg:flex'>
            <div className='mb-6 items-center justify-center overflow-hidden md:mb-8 lg:mb-0 xl:flex'>
              {!!gallery?.length ? (
                <ThumbnailCarousel gallery={gallery} />
              ) : (
                <div className='border-five flex items-center justify-center rounded-md border'>
                  <div className='flex w-full items-center justify-center bg-fill-secondary py-10'>
                    <Image
                      src={item.imageSRC ?? productGalleryPlaceholder}
                      alt={`Product gallery ${item.id}`}
                      width={650}
                      height={400}
                      className='rounded-lg'
                    />
                  </div>
                </div>
              )}
            </div>

            <div className='flex shrink-0 flex-col lg:w-[430px] lg:ltr:pl-5 lg:rtl:pr-5 xl:w-[470px] xl:ltr:pl-8 xl:rtl:pr-8 2xl:w-[480px] 2xl:ltr:pl-10 2xl:rtl:pr-10'>
              <div className='pb-3 lg:pb-5'>
                <div className='mt-5 block md:mb-2.5 lg:-mt-1'>
                  <div
                    className='mb-2 -mt-1.5 block md:mb-2.5'
                    onClick={navigateToProductPage}
                    role='button'
                  >
                    <Heading variant='collectionHeading' className=''>
                      {data?.name}
                    </Heading>
                  </div>

                  <h3 className='text-xl font-bold uppercase text-brand-muted-two'>
                    {data?.product_type}
                  </h3>
                </div>

                <ProductDescription data={data} item={item} />
              </div>

              <div className='flex items-center gap-x-10 '>
                <div className='z-20 w-full '>
                  {Object.keys(variations).map((variation) => {
                    return (
                      <ProductAttributes
                        key={`popup-attribute-key${variation}`}
                        variations={variations}
                        attributes={attributes}
                        setAttributes={setAttributes}
                      />
                    );
                  })}
                </div>
                <div>
                  <Counter
                    variant='single'
                    value={selectedQuantity}
                    onIncrement={() => setSelectedQuantity((prev) => prev + 1)}
                    onDecrement={() =>
                      setSelectedQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
                    }
                    disabled={
                      isInCart(item.id)
                        ? getItemFromCart(item.id).quantity +
                            selectedQuantity >=
                          Number(item.stock)
                        : selectedQuantity >= Number(item.stock)
                    }
                  />
                </div>
              </div>
              <div className='py-2'></div>

              <div className='space-y-2.5 pt-2.5 md:space-y-3.5 '>
                <Button
                  onClick={addToCart}
                  className='flex w-full items-center justify-between px-1.5'
                  disabled={!isSelected}
                  loading={addToCartLoader}
                >
                  <span>{'Add to Cart'}</span>
                  {!addToCartLoader ? (
                    <span>{`€ ${item?.price || 0}`}</span>
                  ) : null}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
