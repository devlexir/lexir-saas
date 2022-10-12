import Button from '@components/ui/button';
import React from 'react';

interface IBillingInformation {
  billing_data: {
    id: number;
    label: string;
    input: string;
    icon?: JSX.Element;
  }[];
}

const BillingInformation = ({ billing_data }: IBillingInformation) => {
  return (
    <div className='pt-5 flex flex-col gap-y-6'>
      {billing_data.map((data) => {
        return (
          <div className='grid grid-cols-3 ' key={data.id}>
            <h3 className='font-bold text-[#2D2D2D]'>{data.label}</h3>
            <p>{data.input}</p>
          </div>
        );
      })}
      <div className='pt-4 flex gap-x-6'>
        <Button variant='saasPrimary'>Change credit card</Button>
        <Button variant='saasPrimary'>Edit billing information</Button>
      </div>
    </div>
  );
};

export default BillingInformation;
