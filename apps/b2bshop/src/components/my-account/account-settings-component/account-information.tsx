import AccountHeader from './account-header';
import AccountInformationForm from './account-information-form';
import { useState } from 'react';

interface AccountInfo {
  email?: string;
  password?: string;
}

const AccountInfo = ({ email, password }: AccountInfo) => {
  const [editState, setEditState] = useState(true);

  function handleClickEdit() {
    setEditState(!editState);
  }
  return (
    <div>
      <AccountHeader
        title='Account Information'
        handleClick={handleClickEdit}
        state={editState}
      />
      {editState ? (
        <div className='grid grid-cols-1 gap-y-10 text-brand-dark'>
          <div className='flex flex-col gap-y-1'>
            <span className='font-bold'>Email</span>
            <span className='text-lg'>{email}</span>
          </div>
          <div className='flex flex-col gap-y-1'>
            <span className='font-bold'>Password</span>
            <span className='text-lg'>{password}</span>
            <a href='#' className='text-xs text-brand-muted'>
              Reset Password
            </a>
          </div>
        </div>
      ) : (
        <AccountInformationForm />
      )}
    </div>
  );
};

export default AccountInfo;
