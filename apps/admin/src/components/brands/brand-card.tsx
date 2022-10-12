import Image from 'next/image';

import { productPlaceholder } from '@utils/placeholders';

const BrandCard = ({ brands }: any) => {
  const { brand_name, country, plan } = brands ?? {};

  const PlanType = ({ plan }: any) => {
    switch (plan) {
      case 'trial':
        return (
          <div
            className='flex justify-center items-center w-22 h-6 rounded 
          text-white text-base bg-[#6CAFE6]'
          >
            Trial
          </div>
        );
      case 'starter':
        return (
          <div
            className='flex justify-center items-center w-22 h-6 rounded 
          text-white text-base bg-[#85CDB4]'
          >
            Starter
          </div>
        );
      case 'premium':
        return (
          <div
            className='flex justify-center items-center w-22 h-6 rounded 
          text-white text-base bg-[#E3BD4A]'
          >
            Premium
          </div>
        );
      case 'dropship':
        return (
          <div
            className='flex justify-center items-center w-22 h-6 rounded 
          text-white text-base bg-[#2E765E]'
          >
            Dropship
          </div>
        );
      default:
        return <>--</>;
    }
  };
  return (
    <div className='flex p-4 h-[202] my-4 overflow-hidden transition-all duration-200 border border-[#E7E7E7] rounded-lg shadow '>
      <div className='relative flex items-center justify-center w-[120px] p-4'>
        <Image
          src={productPlaceholder}
          alt={brand_name}
          width={45}
          height={145}
          layout='fixed'
          className='product-image'
        />
      </div>

      <div className='flex flex-col justify-center w-full gap-y-2'>
        <h1
          title={brand_name}
          className='text-xl text-[#2D2D2D] font-semibold text-ellipsis overflow-hidden'
        >
          {brand_name}
        </h1>
        <h3
          title={country}
          className='text-base text-[#4F4F4F] font-normal truncate'
        >
          {country}
        </h3>
        <div className='flex flex-row justify-between w-full'>
          <div className='text-base text-[#4F4F4F] font-normal'>
            Sales to Date
          </div>
          <div className='text-base text-[#4F4F4F] font-semibold'>{`€ ${'240,50'}`}</div>
        </div>
        <div className='flex flex-row justify-between w-full'>
          <div className='text-base text-[#4F4F4F] font-normal'>Plan</div>
          <PlanType plan={plan} />
        </div>
      </div>
    </div>
  );
};

export default BrandCard;
