import EditIcon from '@components/icons/edit-icon';
import Heading from '@components/ui/heading';
import React, { MouseEventHandler } from 'react';

interface AccountHeader {
  title: string;
  handleClick: MouseEventHandler<HTMLButtonElement>;
  state: boolean;
}

const AccountHeader = ({ title, handleClick, state }: AccountHeader) => {
  return (
    <div className='mb-10 flex w-full justify-between'>
      <Heading variant='titleMedium'>{title}</Heading>
      {state ? (
        <button className='flex items-center gap-x-3' onClick={handleClick}>
          <EditIcon />
          {'Edit'}
        </button>
      ) : null}
    </div>
  );
};

export default AccountHeader;
