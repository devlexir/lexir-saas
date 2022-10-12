import FilterMenuOption from '@components/search/category-filter-menu';
import Heading from '@components/ui/heading';
import Scrollbar from '@components/ui/scrollbar';

interface ICategory {
  id: number;
  slug: string;
  name: string;
}
interface ICategoryFilter {
  categories: ICategory[];
}

export const CategoryFilter = ({ categories }: ICategoryFilter) => {
  return (
    <div className='block'>
      <Heading className='mb-5 -mt-1'>{'Categories'}</Heading>
      <div className='max-h-fit overflow-hidden rounded border border-border-base'>
        <Scrollbar className='category-filter-scrollbar w-full'>
          {categories?.length ? (
            <FilterMenuOption items={categories} filterType='category' />
          ) : (
            <div className='min-h-full px-9 pt-6 pb-8 lg:p-8'>
              {'No Results Found'}
            </div>
          )}
        </Scrollbar>
      </div>
    </div>
  );
};
