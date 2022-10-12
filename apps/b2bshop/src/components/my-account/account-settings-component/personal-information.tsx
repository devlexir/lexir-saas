import AccountHeader from './account-header';
import AccountInformationForm from './account-information-form';
import Input from '@components/ui/form/input';
import React, { useState } from 'react';

interface PeronalInfo {
  firstName: string;
  lastName: string;
  phone: string;
}
const PeronalInfo = ({ firstName, lastName, phone }: PeronalInfo) => {
  const [editState, setEditState] = useState(true);

  function handleClickEdit() {
    setEditState(!editState);
  }
  return (
    <div>
      <AccountHeader
        title='Personal Information'
        handleClick={handleClickEdit}
        state={editState}
      />

      {editState ? (
        <div className=' grid grid-cols-2 gap-y-10 text-brand-dark'>
          <div className='flex flex-col gap-y-1'>
            <span>First Name</span>
            <span>{firstName}</span>
          </div>
          <div className='flex flex-col gap-y-1'>
            <span>Last Name</span>
            <span>{lastName}</span>
          </div>
          <div className='flex flex-col gap-y-1'>
            <span>Phone Number</span>
            <span>{phone}</span>
          </div>
        </div>
      ) : (
        <AccountInformationForm />
      )}
    </div>
  );
};

export default PeronalInfo;
