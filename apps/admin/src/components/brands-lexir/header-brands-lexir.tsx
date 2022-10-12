import Image from 'next/image';
import Link from 'next/link';

import { useModalAction } from '@components/ui/modal/modal.context';

// ** Images ** //
import salesReport from '@assets/brands-lexir/get-report.png';

const PlayIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
    version='1.1'
    id='Capa_1'
    x='0px'
    y='0px'
    viewBox='0 0 32 32'
    xmlSpace='preserve'
  >
    <g>
      <g id='play_x5F_alt'>
        <path
          style={{ fill: '#030104' }}
          d='M16,0C7.164,0,0,7.164,0,16s7.164,16,16,16s16-7.164,16-16S24.836,0,16,0z M10,24V8l16.008,8L10,24    z'
        />
      </g>
    </g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
  </svg>
);

const HeaderSection = (props: any) => {
  const { openModal } = useModalAction();

  function handleModal() {
    openModal('VIDEO_PLAYER');
  }

  return (
    <>
      <div className='flex justify-center'>
        <div className='grid min-h-fit w-full justify-center'>
          <div className='mt-20 items-center sm:my-auto md:items-start'>
            <div className=' flex justify-center '>
              <h1
                className='text-center font-Source_Serif_Pro text-5xl font-bold md:text-6xl'
                dangerouslySetInnerHTML={{
                  __html: props.title,
                }}
              />
            </div>

            <div className=' pt-8 text-center text-xl font-normal text-[#2d2d2d] '>
              <span
                dangerouslySetInnerHTML={{
                  __html: props.description,
                }}
              />
            </div>
            <div className='my-auto mt-12 animate-bounce text-center'>
              <Link href={`${props.cta_href}`}>
                <a
                  className='rounded-md bg-[#2d2d2d] py-3 px-12 text-white hover:bg-[#3e3e3e]'
                  dangerouslySetInnerHTML={{
                    __html: props.cta_text,
                  }}
                />
              </Link>
            </div>
            <div className='relative mt-12 flex justify-center'>
              <Image src={salesReport} />
              <button
                onClick={handleModal}
                className='absolute top-1/2 left-1/2 z-30 w-12 -translate-x-1/2 -translate-y-1/2'
              >
                <PlayIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderSection;
