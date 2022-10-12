import Input from '@components/ui/form/input';
import { useFilter } from '@contexts/filter/filter.context';
import { useState, useEffect } from 'react';

const RangeSlider = ({ min = 0, max = 100, priceCap = 2 }) => {
  const { addFilter, filters } = useFilter();

  let initialMin = filters.minPrice[0] || [0];
  let initialMax = filters.maxPrice[0] || [100];

  const [minValue, setMinValue] = useState(initialMin);
  const [maxValue, setMaxValue] = useState(initialMax);

  const handleMin = (e) => {
    if (maxValue - minValue >= priceCap && maxValue <= max) {
      if (parseInt(e.target.value) > maxValue) {
      } else {
        setMinValue(e.target.value);
      }
    } else {
      if (parseInt(e.target.value) < minValue) {
        setMinValue(e.target.value);
      }
    }
    addFilter({ id: 'maxValue', name: minValue, slug: minValue }, 'minPrice');
  };

  const handleMax = (e) => {
    if (maxValue - minValue >= priceCap && maxValue <= max) {
      if (parseInt(e.target.value) < minValue) {
      } else {
        setMaxValue(e.target.value);
      }
    } else {
      if (e.target.value > maxValue) {
        setMaxValue(e.target.value);
      }
    }
    addFilter({ id: 'maxValue', name: maxValue, slug: maxValue }, 'maxPrice');
  };

  useEffect(() => {}, [minValue, maxValue, max]);

  return (
    <div className='flex flex-col'>
      <div className='flex justify-start items-center my-6 gap-3 w-full lg:w-11/12'>
        <Input
          name='min-value'
          onChange={handleMin}
          type='number'
          variant='outline'
          value={minValue}
        />
        <div className='font-semibold text-lg'> - </div>
        <div className=' '>
          <Input
            name='max-value'
            onChange={handleMax}
            type='number'
            value={maxValue}
            variant='outline'
          />
        </div>
      </div>

      <div className='mb-4'>
        {/* Slider line */}
        <div className='relative h-0.5 bg-brand-dark' />

        <div className='relative'>
          <input
            onChange={handleMin}
            type='range'
            min={min}
            max={max}
            value={minValue}
            className='absolute w-full  -top-1  h-1   bg-transparent  appearance-none pointer-events-none'
          />

          <input
            onChange={handleMax}
            type='range'
            min={min}
            max={max}
            value={maxValue}
            className='absolute w-full  -top-1 h-1  bg-transparent appearance-none  pointer-events-none'
          />
        </div>
      </div>
      <div className='flex justify-between text-fill-five text-xs'>
        <span>0€</span>
        <span>100€</span>
      </div>
    </div>
  );
};

export default RangeSlider;
