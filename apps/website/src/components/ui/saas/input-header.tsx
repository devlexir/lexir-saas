import Image from 'next/image';
import React from 'react';

interface IInputContainer {
  title: string;
  children: any;
  logo?: any;
}

const InputContainer = ({ title, children, logo }: IInputContainer) => {
  return (
    <div className='border py-10 px-14 rounded bg-white'>
      <div className='pb-6 border-b flex justify-between items-center'>
        <h2 className='font-bold text-2xl'>{title}</h2>
        {logo && <Image src={logo} width={80} height={30} />}
      </div>
      {children}
    </div>
  );
};

export default InputContainer;
