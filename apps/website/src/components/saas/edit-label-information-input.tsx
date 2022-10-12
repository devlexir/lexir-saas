import { EditIcon } from '@assets/icons/EditIcon';
import MobileInputHeader from '@components/ui/saas/mobile-input-header';
import React from 'react';

interface IEditLabelInformationInput {
  title: string;
  edit_label?: string;
}

const EditLabelInformationInput = ({
  title,
  edit_label = 'Edit',
}: IEditLabelInformationInput) => {
  return (
    <div className='flex flex-row justify-between p-4'>
      <MobileInputHeader title={title} />
      <h3 className='text-sm text-center font-bold text-brand-dark'></h3>
      <button className='flex flex-row items-center gap-x-2'>
        <EditIcon width='20' height='20' />
        <p className='text-sm'>{edit_label}</p>
      </button>
    </div>
  );
};

export default EditLabelInformationInput;
