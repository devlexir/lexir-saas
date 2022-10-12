import React from 'react';

import { Card } from '@components/common/card';
import Search from '@components/common/search';
import { Filter } from '@components/icons/filter';

import cn from 'classnames';

import CustomerFilter from '../filters/orders/customer-filter';
import CustomerTypeFilter from '../filters/orders/customer-type-filter';
import OrderIdFilter from '../filters/orders/order-id-filter';

const SearchBar = ({ handleSearch, visible }: any) => {
  return (
    <Card className='flex flex-col mb-8 pb-6 border rounded-lg border-[#E7E7E7]'>
      <div className='w-full flex flex-col md:flex-row items-center pt-6 px-4'>
        <div className='w-full md:w-3/4 flex flex-col items-start '>
          <Search onSearch={handleSearch} />
        </div>

        <button
          className='text-accent text-base w-1/4 font-semibold flex items-center 
          justify-center md:ms-5 mt-5 md:mt-0 bg-gray-200 py-3 cursor-default	rounded-lg'
        >
          <Filter />
          <span className='text-[#1C8C64] pl-2'>FILTER</span>
        </button>
      </div>

      <div
        className={cn('w-full flex transition', {
          'h-auto visible': visible,
          'h-0 invisible': !visible,
        })}
      >
        <div
          className='flex flex-wrap md:flex-row md:items-center mt-5 md:mt-8 
            border-t border-gray-200 pt-5 md:pt-8 px-4 w-full gap-8  sm:justify-start'
        >
          <OrderIdFilter />
          <CustomerFilter />
          <CustomerTypeFilter />
        </div>
      </div>
    </Card>
  );
};

export default SearchBar;
