import { EditIcon } from '@assets/icons/EditIcon';
import React, { useState } from 'react';

interface IAccountDetailsInput {
  input: string;
  placeholder?: string;
  children: React.ReactNode;
}

const AccountDetailsInput = ({
  input,
  placeholder,
  children,
}: IAccountDetailsInput) => {
  const [isEdit, setIsEdit] = useState(false);
  function handleClickEdit() {
    setIsEdit((isEdit) => !isEdit);
  }
  return (
    <div className='flex pt-10 justify-between items-center gap-x-4 min-h-[120px]'>
      {isEdit ? (
        children
      ) : (
        <div className='grid grid-cols-1 gap-y-10 text-brand-dark'>
          <div className='flex flex-col gap-y-1'>
            <span>{input}</span>
            <span className='text-lg font-bold'>{placeholder}</span>
          </div>
        </div>
      )}

      <button className='flex gap-x-4' onClick={handleClickEdit}>
        <EditIcon />
        <span className=''>{'Edit'}</span>
      </button>
    </div>
  );
};

export default AccountDetailsInput;
