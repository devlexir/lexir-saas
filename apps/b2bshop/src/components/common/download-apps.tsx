import Heading from '@components/ui/heading';
import { ROUTES } from '@utils/routes';
import cn from 'classnames';
import { useRouter } from 'next/router';

interface Props {
  className?: string;
}

const DownloadApps: React.FC<Props> = ({ className = 'pt-1.5 md:pt-0' }) => {
  const router = useRouter();

  function handleEmailClick() {
    router.push(ROUTES.PRIVACY);
  }

  const data = {
    title: 'Have a brand you’d like to see on Lexir?',
    description: (
      <>
        {`Lexir is always looking to connect with new exciting craft brands from
        around the world. If you have a brand in mind that you'd like to see on
        Lexir, let us know. You can leave us their name and email `}
        <button
          type='button'
          onClick={handleEmailClick}
          className='font-bold underline hover:no-underline focus:text-brand-dark focus:outline-none'
        >
          {'here. '}
        </button>
      </>
    ),
  };

  const { title, description } = data;
  return (
    <div className={cn('overflow-hidden bg-fill-two', className)}>
      <div className='mx-auto max-w-[1920px] items-center justify-between px-8 sm:px-16 md:flex lg:px-28 xl:px-32 2xl:px-36 3xl:px-48'>
        <div className='mx-auto max-w-[350px] pb-5 pt-1.5 md:pt-4 md:ltr:ml-0 md:rtl:mr-0 lg:flex lg:max-w-[614px] lg:items-center  3xl:ltr:pl-10 3xl:rtl:pr-10'>
          <div className='py-14 text-center md:ltr:text-left md:rtl:text-right xl:py-24 2xl:py-32'>
            <Heading variant='collectionHeading'>{title}</Heading>
            <p className='max-w-[500px] pt-5 text-base leading-7 text-brand-dark text-opacity-70 lg:pt-7 2xl:text-[17px] '>
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadApps;
