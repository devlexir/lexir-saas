import React from 'react';

export interface ISaasHeader {
  title: string;
}

export const SaasHeader = ({ title }: ISaasHeader) => {
  return (
    <h1 className='font-Source_Serif_Pro font-bold md:text-5xl md:leading-[56px] text-[24px] leading-[26px] text-[#2D2D2D]'>
      {title}
    </h1>
  );
};
