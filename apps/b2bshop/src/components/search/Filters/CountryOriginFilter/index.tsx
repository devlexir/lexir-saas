import CategoryFilterMenu from '@components/search/category-filter-menu';
import Alert from '@components/ui/alert';
import Heading from '@components/ui/heading';
import CategoryListCardLoader from '@components/ui/loaders/category-list-card-loader';
import Scrollbar from '@components/ui/scrollbar';
import { useCategoriesQuery } from '@framework/basic-rest/category/get-all-categories';

interface ICountry {
  id: number;
  slug: string;
  name: string;
}
interface ICountryFilter {
  countries: ICountry[];
}

export const CountryOriginFilter = ({ countries }: ICountryFilter) => {
  return (
    <div className='block'>
      <Heading className='mb-5 -mt-1'>{'Country of origin'}</Heading>
      <div className='max-h-fit overflow-hidden rounded border border-border-base'>
        <Scrollbar className='category-filter-scrollbar w-full'>
          {countries.length ? (
            <CategoryFilterMenu items={countries} filterType='country' />
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
