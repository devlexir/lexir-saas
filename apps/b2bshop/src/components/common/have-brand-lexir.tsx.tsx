import Ad2 from './ad2';
import Button from '@components/ui/button';
import Heading from '@components/ui/heading';
import { heroAd2 } from '@framework/basic-rest/static/ads';
import { ROUTES } from '@utils/routes';
import cn from 'classnames';
import { useRouter } from 'next/router';

interface Props {
  className?: string;
}

const HaveBrandLexir: React.FC<Props> = ({ className }) => {
  const router = useRouter();

  function handleEmailClick() {
    router.push(ROUTES.PRIVACY);
  }

  const data = {
    title: 'Have a brand you’d like to see on',
    second_title: ' Lexir?',
    description: (
      <>
        {`Lexir is always looking to connect with new exciting craft brands from
        around the world. If you have a brand in mind that you'd like to see on
        Lexir, please leave us their brand name and email. `}
      </>
    ),
  };

  const { title, second_title, description } = data;
  return (
    <div className={cn('overflow-hidden bg-fill-two', className)}>
      <div className='mx-auto min-h-[414px] max-w-[1920px] items-center justify-between sm:flex md:pl-14 lg:pl-28'>
        <div className='px-4 sm:max-w-[350px] lg:flex lg:max-w-[521px] lg:items-start '>
          <div className='py-6 text-center sm:ltr:text-left sm:rtl:text-right lg:py-8 '>
            <div className='flex'>
              <Heading variant='collectionHeading'>
                {title}
                <span className='text-brand'>{second_title}</span>
              </Heading>
            </div>
            <p className='pt-6 text-base leading-5 text-brand-dark text-opacity-70 sm:max-w-[500px] lg:leading-7 2xl:text-[17px] '>
              {description}
            </p>
            <Button className='mt-5 min-w-[336px] lg:mt-10'>
              {'Suggest a Brand'}
            </Button>
          </div>
        </div>
        <Ad2 data={heroAd2} minHeigth='min-h-[414px]' />
      </div>
    </div>
  );
};

export default HaveBrandLexir;
