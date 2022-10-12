import { BusinessIcon } from '@assets/icons/BusinessIcon';
import { EditIcon } from '@assets/icons/EditIcon';
import { EmailIcon } from '@assets/icons/EmailIcon';
import { SecurityIcon } from '@assets/icons/SecurityIcon';
import { TelephoneIcon } from '@assets/icons/TelephoneIcon';
import MobileInputHeader from '@components/ui/saas/mobile-input-header';
import React from 'react';

export const MobileAccountInfo = () => {
  return (
    <div>
      <div className='flex flex-row justify-between p-4'>
        <MobileInputHeader title='Account Details' />
        <h3 className='text-sm text-center font-bold text-brand-dark'></h3>
        <button className='flex flex-row items-center gap-x-2'>
          <EditIcon width='20' height='20' />
          <p className='text-sm '>Edit</p>
        </button>
      </div>
      <div className='bg-white px-4 py-5 rounded'>
        <div className='flex flex-col gap-y-4'>
          <div className='flex justify-between'>
            <h3 className='text-xl'>Marlon Brando</h3>
            <BusinessIcon />
          </div>
          <h3 className='text-brand-muted text-sm'>Lexir</h3>
        </div>
      </div>
      <div className='bg-white px-4 py-5 rounded mt-8'>
        <div className='flex flex-col gap-y-6'>
          <div className='flex justify-between items-center'>
            <div className='flex flex-row w-1/3 items-center gap-x-2'>
              <div className='shrink-0'>
                <TelephoneIcon />
              </div>
              <h3 className='font-bold text-brand-dark text-sm '>{'Phone'}</h3>
            </div>
            <p className='text-brand-muted-four text-sm text-right w-2/3 truncate'>
              {'+351 996 652 358'}
            </p>
          </div>
          <div className='flex justify-between items-center'>
            <div className='flex flex-row w-1/3 items-center gap-x-2 '>
              <div className='shrink-0'>
                <EmailIcon />
              </div>
              <h3 className='font-bold text-brand-dark text-sm '>{'Email'}</h3>
            </div>
            <p className='text-brand-muted-four text-sm text-right w-2/3 truncate'>
              {'bohomia_paris@gmail.com'}
            </p>
          </div>
          <div className='flex justify-between items-center'>
            <div className='flex flex-row w-1/3 items-center gap-x-2 '>
              <div className='shrink-0'>
                <SecurityIcon />
              </div>
              <h3 className='font-bold text-brand-dark text-sm '>
                {'Two-factor authentication'}
              </h3>
            </div>
            <p className='text-brand-muted-four text-sm text-right w-2/3 truncate'>
              {'Not Enabled'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
