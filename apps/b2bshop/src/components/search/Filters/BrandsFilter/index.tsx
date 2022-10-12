import CategoryFilterMenu from '@components/search/category-filter-menu';
import Heading from '@components/ui/heading';
import Scrollbar from '@components/ui/scrollbar';

export const BrandsFilter = ({ brands }: any) => {
  return (
    <div className={'block'}>
      <Heading className='mb-5 -mt-1'>{'Brands'}</Heading>
      <div className='rounded border border-border-base'>
        <Scrollbar className='h-80'>
          {brands?.length ? (
            <CategoryFilterMenu items={brands} filterType='brand' />
          ) : (
            <div className='min-h-full px-9 pt-6 pb-8 lg:p-8'>
              {'No Brands Found'}
            </div>
          )}
        </Scrollbar>
      </div>
    </div>
  );
};
