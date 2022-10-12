import Heading from '@components/ui/heading';
import Image from 'next/image';

const Ad1 = ({ data }: any) => {
  const { title, background_image, logo } = data;
  return (
    <div
      className='min-h-[357px] w-full bg-cover bg-center sm:w-7/12'
      style={{
        backgroundImage: `url('${background_image}')`,
      }}
    >
      <div
        className='h-full min-h-[357px]'
        style={{
          background:
            'linear-gradient(-270deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 61.76%)',
        }}
      >
        <div className='flex flex-col gap-y-5 p-4 sm:py-6 sm:px-8'>
          <div>
            <Image
              src={logo?.url}
              width={logo?.width}
              height={logo?.height}
              alt={'Ad image for the banner'}
            />
          </div>
          <Heading variant='adHeading' className='max-w-[297px]'>
            {title}
          </Heading>
        </div>
      </div>
    </div>
  );
};

export default Ad1;
