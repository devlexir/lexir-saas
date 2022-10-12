import InformationInput from '../information-input';
import { EditIcon } from '@assets/icons/EditIcon';
import MobileInputHeader from '@components/ui/saas/mobile-input-header';
import React from 'react';

interface IMobileBillingInformation {
  billing_data: {
    id: number;
    label: string;
    input: string;
    icon?: JSX.Element;
  }[];
}

const MobileBillingInformation = ({
  billing_data,
}: IMobileBillingInformation) => {
  return (
    <div>
      <div className='flex flex-row justify-between p-4'>
        <MobileInputHeader title='Billing Information' />
        <h3 className='text-sm text-center font-bold text-brand-dark'></h3>
        <button className='flex flex-row items-center gap-x-2'>
          <EditIcon width='20' height='20' />
          <p className='text-sm '>Edit</p>
        </button>
      </div>
      <div className='bg-white p-4 rounded text-sm gap-y-5 flex flex-col'>
        {billing_data.map((data) => {
          return <InformationInput data={data} />;
        })}
      </div>
    </div>
  );
};

export default MobileBillingInformation;
