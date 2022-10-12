import CategoryFilterMenu from '@components/search/category-filter-menu';
import Alert from '@components/ui/alert';
import Heading from '@components/ui/heading';
import CategoryListCardLoader from '@components/ui/loaders/category-list-card-loader';
import Scrollbar from '@components/ui/scrollbar';
import { useCategoriesQuery } from '@framework/basic-rest/category/get-all-categories';

export const CategoryFilter = () => {
  const data = {
    categories: {
      data: [
        {
          id: 1,
          slug: 'sdfsdfsdfsd',
          name: 'sdfsdf',
        },
        {
          id: 1,
          slug: 'sdfsdfsdfsdfsdf',
          name: 'sdfsdf',
        },
        {
          id: 1,
          slug: 'sdfsdf',
          name: 'sdfsdf',
        },
      ],
    },
  };

  return (
    <div className='block'>
      <Heading className='mb-5 -mt-1'>{'Categories'}</Heading>
      <div className='max-h-fit overflow-hidden rounded border border-border-base'>
        <Scrollbar className='category-filter-scrollbar w-full'>
          {data?.categories?.data?.length ? (
            <CategoryFilterMenu items={data?.categories?.data} />
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
