import Image from 'next/image';

import Loader from '@components/ui/loader/loader';

import { useProductQuery } from '@data/product/product.query';

interface Props {
  product: any;
}

const ProductCard = ({ product }: Props) => {
  return (
    <div className='bg-white p-4 max-w-[345px] rounded-lg'>
      <div className='flex flex-col'>
        <div className='flex justify-center pt-6 pb-5'>
          <Image
            src={product.imageSRC ?? product.productPlaceholder}
            alt={product.name}
            width={45}
            height={145}
            layout='fixed'
            className='product-image'
          />
        </div>
        {/* A row that consists of two columns each containing a group of two contents. */}
        <div className='flex flex-row'>
          <div className='grid grid-cols-2 gap-x-4 gap-y-2'>
            <div className='flex flex-col gap-y-1'>
              <h3 className='text-base font-black text-ellipsis overflow-hidden text-[#2D2D2D]'>
                Product Name
              </h3>
              <span className='text-base font-normal text-ellipsis overflow-hidden text-[#4F4F4F]'>
                {product.name}
              </span>
            </div>
            <div className='flex flex-col gap-y-1'>
              <h3 className='text-base font-black text-ellipsis overflow-hidden text-[#2D2D2D]'>
                B2B Price
              </h3>
              <span className='text-base font-normal text-ellipsis overflow-hidden text-[#4F4F4F]'>
                {`€ ${product.b2bprice}`}
              </span>
            </div>

            <div className='flex flex-col gap-y-1'>
              <h3 className='text-base font-black text-ellipsis overflow-hidden text-[#2D2D2D]'>
                Brand
              </h3>
              <span className='text-base font-normal text-ellipsis overflow-hidden text-[#4F4F4F]'>
                {product.brand}
              </span>
            </div>
            <div className='flex flex-col gap-y-1'>
              <h3 className='text-base font-black text-ellipsis overflow-hidden text-[#2D2D2D]'>
                B2C Price
              </h3>
              <span className='text-base font-normal text-ellipsis overflow-hidden text-[#4F4F4F]'>
                {`€ ${product.b2cprice}`}
              </span>
            </div>

            <div className='flex flex-col gap-y-1'>
              <h3 className='text-base font-black text-ellipsis overflow-hidden text-[#2D2D2D]'>
                Category
              </h3>
              <span className='text-base font-normal text-ellipsis overflow-hidden text-[#4F4F4F]'>
                {product.category}
              </span>
            </div>
            <div className='flex flex-col gap-y-1'>
              <h3 className='text-base font-black text-ellipsis overflow-hidden text-[#2D2D2D]'>
                ABV
              </h3>
              <span className='text-base font-normal text-ellipsis overflow-hidden text-[#4F4F4F]'>
                {product.abv}
              </span>
            </div>

            <div className='flex flex-col gap-y-1'>
              <h3 className='text-base font-black text-ellipsis overflow-hidden text-[#2D2D2D]'>
                SKU
              </h3>
              <span className='text-base font-normal text-ellipsis overflow-hidden text-[#4F4F4F]'>
                {product.sku}
              </span>
            </div>
            <div className='flex flex-col gap-y-1'>
              <h3 className='text-base font-black text-ellipsis overflow-hidden text-[#2D2D2D]'>
                Size (ML)
              </h3>
              <span className='text-base font-normal text-ellipsis overflow-hidden text-[#4F4F4F]'>
                {product.size}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductCardModal = ({ productSlug }: { productSlug: string }) => {
  const { data, isLoading: loading } = useProductQuery(productSlug);

  if (loading || !data) return <Loader text='Loading' />;
  return <ProductCard product={data} />;
};

export default ProductCardModal;
