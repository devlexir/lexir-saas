import Image from 'next/image';

import { useModalAction } from '@components/ui/modal/modal.context';

import { productPlaceholder } from '@utils/placeholders';

const ProductCard = ({ item }: any) => {
  const { id, name, brand, category, imageSRC, b2bprice, b2cprice } =
    item ?? {};

  const { openModal } = useModalAction();

  function handleVariableProduct() {
    return openModal('MOBILE_PRODUCT_OPEN', id);
  }

  return (
    <div
      onClick={handleVariableProduct}
      className='flex p-4 h-[202] my-4 overflow-hidden transition-all duration-200 border border-[#E7E7E7] rounded-lg shadow '
    >
      <div className='relative flex items-center justify-center w-[120px] p-4'>
        <Image
          src={imageSRC ?? productPlaceholder}
          alt={name}
          width={45}
          height={145}
          layout='fixed'
          className='product-image'
        />
      </div>

      <div className='flex flex-col items-start justify-between w-full'>
        <div className='flex flex-col'>
          <h1
            title={name}
            className='text-xl text-[#2D2D2D] font-semibold text-ellipsis overflow-hidden pb-2'
          >
            {name}
          </h1>
          <h3
            title={category}
            className='text-base text-[#4F4F4F] font-normal truncate pb-2'
          >
            {category}
          </h3>
          <h3
            title={brand}
            className='text-base text-[#4F4F4F] font-normal truncate pb-2'
          >
            {brand}
          </h3>
        </div>

        <div className='flex flex-col w-full gap-2'>
          <div className='flex flex-row justify-between items-center'>
            <div
              className='flex h-8 w-24 items-center justify-center bg-[#85CDB4] 
            text-white text-base rounded'
            >
              B2B Price
            </div>
            <div className='text-[#2D2D2D] text-base font-[550]'>
              {`€ ${b2bprice}`}
            </div>
          </div>
          <div className='flex flex-row justify-between items-center'>
            <div
              className='flex h-8 w-24  items-center justify-center bg-[#6CAFE6]
             text-white text-base rounded'
            >
              B2C Price
            </div>
            <div className='text-[#2D2D2D] text-base font-[550]'>
              {`€ ${b2cprice}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
