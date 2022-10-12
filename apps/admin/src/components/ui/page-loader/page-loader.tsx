import Image from 'next/image';

import cn from 'classnames';

import loaderComponent from '../loader/loader-glass.svg';

const PageLoader = () => {
  return (
    <div
      className={cn(
        'flex h-screen w-full flex-col items-center justify-center'
      )}
    >
      <div className='relative flex'>
        <Image src={loaderComponent} />
      </div>
    </div>
  );
};

export default PageLoader;
