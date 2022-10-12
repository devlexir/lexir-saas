import AccountHeader from './account-header';
import AccountInformationForm from './account-information-form';
import React, { useState } from 'react';

interface ConpanyInformation {
  company_name: string;
  company_address: string;
  company_email: string;
  phone: string;
  company_number: string;
}

const ConpanyInformation = ({
  company_name,
  company_address,
  company_email,
  phone,
  company_number,
}: ConpanyInformation) => {
  const [editState, setEditState] = useState(true);

  function handleClickEdit() {
    setEditState(!editState);
  }

  return (
    <div>
      <AccountHeader
        title='Company Information'
        handleClick={handleClickEdit}
        state={editState}
      />

      {editState ? (
        <div className=' grid grid-cols-2 gap-y-10 text-brand-dark'>
          <div className='flex flex-col gap-y-1'>
            <span className='font-bold'>Company Name</span>
            <span className='text-lg'>{company_name}</span>
          </div>
          <div className='flex max-w-[238px] flex-col gap-y-1'>
            <span>Company Address</span>
            <span>{company_address}</span>
          </div>
          <div className='flex flex-col gap-y-1'>
            <span>Company Email</span>
            <span>{company_email}</span>
          </div>
          <div className='flex flex-col gap-y-1'>
            <span>Phone Number</span>
            <span>{phone}</span>
          </div>
          <div className='flex flex-col gap-y-1'>
            <span>Company Number</span>
            <span>{company_number}</span>
          </div>
        </div>
      ) : (
        <AccountInformationForm />
      )}
    </div>
  );
};

export default ConpanyInformation;
