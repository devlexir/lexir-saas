import Heading from '@components/ui/heading';
import RangeSlider from '@components/ui/rangeSlider';
import Scrollbar from '@components/ui/scrollbar';

export const PriceFilter = () => {
  return (
    <div className='block'>
      <Heading className='-mt-1'>{'Price'}</Heading>
      <div className='max-h-fit overflow-hidden rounded'>
        <Scrollbar className='category-filter-scrollbar w-full'>
          <RangeSlider />
        </Scrollbar>
      </div>
    </div>
  );
};
