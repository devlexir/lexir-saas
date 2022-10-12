import React from 'react';

const InformationInput = ({ data }: any) => {
  return (
    <div className='flex justify-between items-center gap-x-5' key={data.id}>
      <div className='flex w-full flex-row gap-2'>
        <div className='shrink-0 pt-0.5'>{data.icon}</div>
        <div className='flex flex-col items-start gap-2'>
          <h3 className='font-bold text-brand-dark'>{data.label}</h3>
          <p className='text-brand-muted-four text-left text-sm'>
            {data.input}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InformationInput;
