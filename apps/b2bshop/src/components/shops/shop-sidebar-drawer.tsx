import Scrollbar from '@components/ui/scrollbar';
import { useUI } from '@contexts/ui.context';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import { getDirection } from '@utils/get-direction';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import BrandSidebar from './brand-sidebar';

interface Props {
  data: any;
}

const ShopSidebarDrawer: React.FC<Props> = ({ data }) => {
  const { closeShop } = useUI();
  const { t } = useTranslation('common');
  const router = useRouter();
  const dir = getDirection(router.locale);
  return (
    <div className='flex h-full w-full flex-col justify-between'>
      <div className='relative flex w-full shrink-0 items-center justify-between border-b border-border-base py-0.5 ltr:pr-5 rtl:pl-5 md:ltr:pr-7 md:rtl:pl-7'>
        <button
          className='flex items-center justify-center px-4 py-6 text-2xl text-brand-dark transition-opacity hover:opacity-60 focus:outline-none md:px-5 lg:py-8'
          onClick={closeShop}
          aria-label='close'
        >
          {dir === 'rtl' ? (
            <IoArrowForward className='text-black' />
          ) : (
            <IoArrowBack className='text-black' />
          )}
        </button>
        <h2 className='m-0 w-full text-center text-xl font-bold text-brand-dark ltr:pr-6 rtl:pl-6 md:text-2xl'>
          {t('text-details')}
        </h2>
      </div>

      <Scrollbar className='shop-sidebar-scrollbar mb-auto flex-grow'>
        <BrandSidebar data={data} />
      </Scrollbar>
    </div>
  );
};

export default ShopSidebarDrawer;
