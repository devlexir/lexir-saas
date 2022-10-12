import Image from 'next/image';
import Router from 'next/router';
import React from 'react';

interface IBrandCard {
  brand_data: {
    id: number;
    brand: string;
    logo: any;
    product_type: string;
    last_update: string;
    type_of_product: string;
    city: string;
    country: string;
  };
}
function handleClick(id: number) {
  Router.push(`/saas/brand/${id}`);
  console.log(id);
}
const BrandCard = ({ brand_data }: IBrandCard) => {
  return (
    <div>
      <button
        key={brand_data.id}
        onClick={() => handleClick(brand_data.id)}
        className='flex w-full cursor-pointer items-center rounded-lg bg-white px-2 py-3 border  transition-all shadow-sm hover:shadow-md'
      >
        <div className='relative flex h-16 w-16 shrink-0 items-center mx-5 justify-center overflow-hidden bg-transparent xl:h-20 xl:w-20'>
          <Image alt={'Brand Logo'} src={brand_data.logo} />
        </div>

        <div className='flex flex-col border-l pl-5 '>
          <p className='uppercase text-left text-brand-dark font-bold text-[22px] leading-[32px]'>
            {brand_data.brand}
          </p>
          <span className='mb-1 text-left text-fill-six'>
            {brand_data.type_of_product}
          </span>
          {/* <span className='flex items-center gap-x-2 text-fill-six'>
        <div className='relative flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden bg-fill-secondary'>
          <Image
            alt={`Brand country flag`}
            src={brand_data.country_flag ?? '/'}
            layout='fill'
            objectFit='contain'
          />
        </div>
        {`${brand_data.city}, ${brand_data.country}`}
      </span> */}
        </div>
      </button>
      <div className='flex justify-between pt-1 px-1 text-xs text-brand-muted-four'>
        <span>{'Last Update'}</span>
        <span>{brand_data.last_update}</span>
      </div>
    </div>
  );
};

export default BrandCard;
