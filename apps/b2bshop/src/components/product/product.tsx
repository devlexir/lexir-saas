import ProductDescription from './product-description';
import ProductDetail from './product-details/product-detail';
import { productGalleryPlaceholder } from '@assets/placeholders';
import ProductAttributes from '@components/product/product-attributes';
import Button from '@components/ui/button';
import ThumbnailCarousel from '@components/ui/carousel/thumbnail-carousel';
import Counter from '@components/ui/counter';
import Heading from '@components/ui/heading';
import Image from '@components/ui/image';
import { useCart } from '@contexts/cart/cart.context';
import { useProductQuery } from '@framework/basic-rest/product/get-product';
import usePrice from '@framework/basic-rest/product/use-price';
import { getVariations } from '@framework/basic-rest/utils/get-variations';
import { generateCartItem } from '@utils/generate-cart-item';
import useWindowSize from '@utils/use-window-size';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';

const ProductSingleDetails: React.FC = () => {
  const router = useRouter();
  const {
    query: { slug },
  } = router;
  const { width } = useWindowSize();
  const { data, isLoading } = useProductQuery(slug as string);
  const { addItemToCart, isInCart, getItemFromCart, isInStock } = useCart();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const { price, basePrice, discount } = usePrice(
    data && {
      amount: data.sale_price ? data.sale_price : data.price,
      baseAmount: data.price,
      currencyCode: 'EUR',
    }
  );

  if (isLoading) return <p>Loading...</p>;
  const variations = getVariations(data?.variations);

  const isSelected = !isEmpty(variations)
    ? !isEmpty(attributes) &&
      Object.keys(variations).every((variation) =>
        attributes.hasOwnProperty(variation)
      )
    : true;

  let selectedVariation: any = {};
  if (isSelected) {
    const dataVaiOption: any = data?.variation_options;
    selectedVariation = dataVaiOption?.find((o: any) =>
      isEqual(
        o.options.map((v: any) => v.value).sort(),
        Object.values(attributes).sort()
      )
    );
  }
  const item = generateCartItem(data!, selectedVariation);
  const outOfStock = isInCart(item.id) && !isInStock(item.id);

  function addToCart() {
    if (!isSelected) return;
    // to show btn feedback while product carting
    setAddToCartLoader(true);
    setTimeout(() => {
      setAddToCartLoader(false);
    }, 1500);

    const item = generateCartItem(data!, selectedVariation);
    addItemToCart(item, selectedQuantity);
    toast('Added to the bag', {
      progressClassName: 'fancy-progress-bar',
      position: width! > 768 ? 'bottom-right' : 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }

  return (
    <div className='pt-8 pb-2 md:pt-10'>
      <div className='grid-cols-10 gap-7 lg:grid 2xl:gap-8'>
        <div className='col-span-5 mb-6 overflow-hidden md:mb-8 lg:mb-0 xl:col-span-6'>
          {!!data?.gallery?.length ? (
            <ThumbnailCarousel
              gallery={data?.gallery}
              thumbnailClassName='xl:w-[700px] 2xl:w-[900px]'
              galleryClassName='xl:w-[150px] 2xl:w-[170px]'
            />
          ) : (
            <div className='border-five flex items-center justify-center rounded-md border'>
              <div className='flex w-full items-center justify-center bg-fill-secondary py-10'>
                <Image
                  src={data?.gallery[0]?.original ?? productGalleryPlaceholder}
                  alt={`Product gallery ${item.id}`}
                  width={650}
                  // layout='fill'
                  height={400}
                  className='rounded-lg'
                />
              </div>
            </div>
          )}
        </div>

        <div className='col-span-5 flex shrink-0 flex-col xl:col-span-4 xl:ltr:pl-2 xl:rtl:pr-2'>
          <div className='pb-3 lg:pb-5'>
            <div className='mt-5 block md:mb-2.5 lg:-mt-1'>
              <Heading variant='collectionHeading' className=''>
                {data?.name}
              </Heading>
              <h3 className='text-xl font-bold uppercase text-brand-muted-two'>
                {data?.product_type}
              </h3>
            </div>

            <ProductDescription data={data} item={item} />
          </div>

          <div className='flex items-center gap-x-10'>
            <div className='w-full'>
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
                    ? getItemFromCart(item.id).quantity + selectedQuantity >=
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
              {!addToCartLoader ? <span>{`€ ${item?.price || 0}`}</span> : null}
            </Button>
          </div>
        </div>
      </div>
      <ProductDetail data={data} />
    </div>
  );
};

export default ProductSingleDetails;
