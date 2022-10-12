import Image from 'next/image';

import cn from 'classnames';

import loaderComponent from './loader-glass.svg';
import styles from './loader.module.css';

interface Props {
  className?: string;
  text?: string;
  showText?: boolean;
  simple?: boolean;
}

const Loader = (props: Props) => {
  const { className, showText = true, text = 'Loading...', simple } = props;
  return (
    <>
      {simple ? (
        <div className={cn(className, styles.simple_loading)} />
      ) : (
        <div
          className={cn(
            'flex w-full flex-col items-center justify-center',
            className
          )}
          style={{ height: 'calc(100vh - 200px)' }}
        >
          <Image src={loaderComponent} />
        </div>
      )}
    </>
  );
};

export default Loader;
