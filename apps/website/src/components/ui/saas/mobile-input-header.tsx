import React from 'react';

interface IMobileInputHeader {
  title: string;
}

const MobileInputHeader = ({ title }: IMobileInputHeader) => {
  return <h3 className='text-sm  font-bold text-brand-dark'>{title}</h3>;
};

export default MobileInputHeader;
