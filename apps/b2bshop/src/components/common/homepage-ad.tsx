import Ad1 from './ad1';
import Ad2 from './ad2';

const HomepageAd = ({ ad1, ad2 }: any) => {
  return (
    <div className='mx-auto flex min-h-[357px] w-full max-w-[1920px] flex-col gap-x-0 gap-y-2 sm:flex-row sm:gap-y-0 sm:gap-x-2'>
      <Ad1 data={ad1} />
      <Ad2 data={ad2} />
    </div>
  );
};

export default HomepageAd;
