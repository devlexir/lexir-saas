import Button from '@components/ui/button';
import React from 'react';

interface IBrandDetailsInformation {
  billing_information_data: {
    id: number;
    label: string;
    input: string;
    icon?: JSX.Element;
  }[];
}

const BrandDetailsInformation = ({
  billing_information_data,
}: IBrandDetailsInformation) => {
  return (
    <div className='pt-5 flex flex-col gap-y-6'>
      {billing_information_data.map((data) => {
        return (
          <div className='grid grid-cols-3 ' key={data.id}>
            <h3 className='font-bold text-[#2D2D2D]'>{data.label}</h3>
            <p>{data.input}</p>
          </div>
        );
      })}
      <div className='pt-4 flex gap-x-6'>
        <Button variant='saasPrimary'>Change Brand Name</Button>
        <Button variant='saasPrimary'>Manage Plan</Button>
      </div>
    </div>
  );
};

export default BrandDetailsInformation;
