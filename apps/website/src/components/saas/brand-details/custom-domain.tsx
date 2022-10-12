import { SettingsIcon } from '@assets/icons/Settings';
import Button from '@components/ui/button';
import React from 'react';

interface ICustomDoimain {
  custom_domain_data: {
    text: string;
    subdomain: string;
    subdomain_text?: string;
  };
}

const CustomDoimain = ({ custom_domain_data }: ICustomDoimain) => {
  const {
    text,
    subdomain,
    subdomain_text = 'Default subdomain',
  } = custom_domain_data;
  return (
    <div className='pt-5 flex flex-col gap-y-6'>
      <p>{text}</p>
      <div className='bg-fill-secondary px-12 py-3 flex justify-between items-center'>
        <div>
          <h3 className='text-brand text-xl font-bold'>{subdomain}</h3>
          <p className='text-brand-dark'>{subdomain_text}</p>
        </div>
        <div>
          <SettingsIcon fill='#1C8C64' />
        </div>
      </div>
      <div className='flex gap-x-6'>
        <Button variant='saasPrimary'>Add custom domain</Button>
      </div>
    </div>
  );
};

export default CustomDoimain;
