import { CheckMark } from '@components/icons/checkmark';
import Scrollbar from '@components/ui/scrollbar';

import cn from 'classnames';

import styles from './progress-box.module.css';

type ProgressProps = {
  data: any[] | undefined;
  status: number;
};

const ProgressBox: React.FC<ProgressProps> = ({ status, data }) => {
  return (
    /**
     ** Original component
     */

    <Scrollbar
      className='h-full w-full'
      options={{
        scrollbars: {
          autoHide: 'never',
        },
      }}
    >
      <div className='flex w-full flex-row items-start justify-start py-2 md:py-7'>
        {data?.map((item: any) => (
          <div
            className=' mb-0 flex w-1/3 grow flex-col items-center last:mb-0 lg:w-1/4 xl:w-1/5 2xl:w-1/5'
            key={item.id}
          >
            <div
              className={cn(
                'relative mb-4 flex w-full items-center justify-center',
                status >= item.id ? styles.checked : ''
              )}
            >
              <div
                className={`z-10 flex h-9 w-9 items-center justify-center rounded-full border border-accent text-sm font-bold text-accent ${
                  status >= item.id ? 'bg-accent' : 'bg-light'
                }`}
              >
                {status >= item.id ? (
                  <div className='h-4 w-3'>
                    <CheckMark className='w-full text-white' />
                  </div>
                ) : (
                  item.id
                )}
              </div>
              <div className='absolute top-1/2 -mt-px h-1 w-full bg-gray-100 -ms-px start-0' />
            </div>

            <div className='flex flex-col items-center ms-0'>
              {item && (
                <span className=' flex items-center px-2 text-center text-start text-base font-semibold capitalize text-body-dark'>
                  {item?.name}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </Scrollbar>
  );
};

export default ProgressBox;
