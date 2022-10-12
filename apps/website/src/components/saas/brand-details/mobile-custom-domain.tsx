import EditLabelInformationInput from '../edit-label-information-input';
import { AddIcon } from '@assets/icons/AddIcon';
import Button from '@components/ui/button';
import React from 'react';

interface IMobileCustomDoimain {
  custom_domain_data: {
    text: string;
    subdomain: string;
    subdomain_text?: string;
  };
}

const MobileCustomDoimain = ({ custom_domain_data }: IMobileCustomDoimain) => {
  const {
    text,
    subdomain,
    subdomain_text = 'Default subdomain',
  } = custom_domain_data;
  return (
    <div>
      <EditLabelInformationInput title='Custom Domain' />
      <div className='pt-5 flex flex-col gap-y-6 bg-white p-4'>
        <p className='text-sm md:text-base'>{text}</p>
        <div className='flex justify-between items-center'>
          <div>
            <h3 className='text-brand text-xl font-bold'>{subdomain}</h3>
            <p className='text-brand-dark '>{subdomain_text}</p>
          </div>
        </div>
      </div>
      <div className='flex w-full mt-5'>
        <Button variant='saasPrimary' className='w-full'>
          <div className='flex justify-center items-center gap-x-6'>
            <AddIcon />
            <span className='pt-1'>{'Add custom domain'}</span>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default MobileCustomDoimain;
