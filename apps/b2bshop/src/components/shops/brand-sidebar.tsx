import BoxIcon from '@components/icons/box-icon';
import Heading from '@components/ui/heading';
import Text from '@components/ui/text';
import Image from 'next/image';
import { useState } from 'react';
import { IoLocationOutline } from 'react-icons/io5';

interface ShopSidebarProps {
  data: any;
}

const BrandSidebar: React.FC<ShopSidebarProps> = ({ data }) => {
  const [descriptionState, setDescriptionState] = useState(Boolean(false));
  const descriptionHandel = () => {
    return setDescriptionState(true);
  };
  return (
    <div className='flex flex-col px-6 pt-5'>
      <div className='w-full px-0 pb-8 text-center '>
        <div className='relative mx-auto flex h-32 w-64 shrink-0 items-center justify-center overflow-hidden bg-white '>
          <Image
            src={data?.logo?.original!}
            alt={data?.name}
            layout='fill'
            objectFit='contain'
            className='rounded-xl'
          />
        </div>
        <Heading variant='productHeading' className='mt-14 mb-4'>
          {data?.name}
        </Heading>
        <Text variant='medium' className='text-left'>
          {descriptionState === true ? (
            data?.description
          ) : data?.description.split(' ').length >= 20 ? (
            <>
              {data?.description.split(' ').slice(0, 20).join(' ')}
              {'..'}
              <span
                role='button'
                className='mt-2 block text-center text-xl font-bold text-brand hover:text-brand-muted ltr:ml-0.5 rtl:mr-0.5'
                onClick={descriptionHandel}
              >
                {'Read More'}
              </span>
            </>
          ) : (
            data?.description
          )}
        </Text>
      </div>
      <div className='space-y-6 py-7'>
        <div className='flex items-start'>
          <div className='w-10 shrink-0'>
            <IoLocationOutline className='text-2xl text-brand-dark ' />
          </div>
          <div className='-mt-1'>
            <h4 className='mb-1 text-brand-dark'>{`Location `}</h4>
            <span className='text-xl text-[#595959]'>{`London, United Kingdom`}</span>
          </div>
        </div>
        <div className='flex items-start'>
          <div className='w-10 shrink-0'>
            <BoxIcon className='text-brand-dark' />
          </div>
          <div className='-mt-1'>
            <h4 className='mb-1 text-brand-dark'>{`Product Type `}</h4>
            <span className='text-xl text-[#595959]'>{`Gin`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandSidebar;
