import ImageDefault from '../../../public/icons/default-img.png';
import Image from 'next/image';
import React from 'react';

interface iSaasAccountName {
  image?: any;
  user: string;
  company_name: string;
}

const SaasAccountName = ({
  image,
  user = 'user',
  company_name = 'Company Name',
}: iSaasAccountName) => {
  return (
    <div className='flex gap-x-8 items-center'>
      {!!image ? <Image src={''} /> : <Image src={ImageDefault} />}
      <div className='flex flex-col'>
        <span className='text-[#2D2D2D] text-xl font-bold'>{user}</span>
        <span className='text-[#9E9E9E] text-base'>{company_name}</span>
      </div>
    </div>
  );
};

export default SaasAccountName;
