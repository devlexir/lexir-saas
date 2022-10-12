import React from 'react';

interface IStatus {
  status: string;
}

const Status = ({ status }: IStatus) => {
  switch (status) {
    case 'Paid':
      return <div className='text-brand'>{status}</div>;
    case 'Refunded':
      return <div className='text-brand-error'>{status}</div>;
    default:
      return <div className=''>{status}</div>;
  }
};

export default Status;
