import { Drawer } from '@components/common/drawer/drawer';
import FilterIcon from '@components/icons/filter-icon';
import FilterSidebar from '@components/search/filter-sidebar';
import ListBox from '@components/ui/filter-list-box';
import { useUI } from '@contexts/ui.context';
import { getDirection } from '@utils/get-direction';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const SearchTopBar = ({ numberProducts }: any) => {
  const { openFilter, displayFilter, closeFilter } = useUI();
  const { t } = useTranslation('common');
  const { locale } = useRouter();
  const dir = getDirection(locale);
  const contentWrapperCSS = dir === 'ltr' ? { left: 0 } : { right: 0 };
  return (
    <div className='mb-6 flex items-center justify-between'>
      <button
        className='flex items-center rounded-md border border-border-base px-4 py-2 text-sm font-semibold text-brand-dark transition duration-200 ease-in-out hover:border-brand hover:text-brand focus:outline-none lg:hidden'
        onClick={openFilter}
      >
        <FilterIcon />
        <span className='ltr:pl-2.5 rtl:pr-2.5'>{t('Filters')}</span>
      </button>
      <div className='flex w-full items-center justify-end lg:justify-between'>
        <div className='mt-0.5 hidden shrink-0 text-15px font-medium leading-4 text-brand-dark md:ltr:mr-6 md:rtl:ml-6 lg:block'>
          {'Products Found'} {numberProducts}
        </div>
        <ListBox
          options={[
            { name: 'text-lowest-price', value: 'lowest' },
            { name: 'text-highest-price', value: 'highest' },
            { name: 'text-new-arrival', value: 'new-arrival' },
            { name: 'Alphabetical', value: 'alphabetical' },
          ]}
        />
      </div>
      <Drawer
        placement={dir === 'rtl' ? 'right' : 'left'}
        open={displayFilter}
        onClose={closeFilter}
        handler={false}
        showMask={true}
        level={null}
        contentWrapperStyle={contentWrapperCSS}
      >
        <FilterSidebar />
      </Drawer>
    </div>
  );
};

export default SearchTopBar;
