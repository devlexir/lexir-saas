import baldoria_logo from '../../../../public/brands/baldoria-logo.png';
import erika_logo from '../../../../public/brands/erika-logo.png';
import BrandCard from '@components/saas/brand/brand-card';
import SaasBrandTable from '@components/saas/saas-brand-table';
import Button from '@components/ui/button';
import { SaasHeader } from '@components/ui/saas/saas-header';
import SaasLayout from '@components/ui/saas/saas-layout';
import Search from '@components/ui/search';
import React, { useState } from 'react';

const SaasBrand = () => {
  const [searchTerm, setSearchTerm] = useState('');

  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
  }

  const SaasBrandTableData = [
    {
      id: 1,
      brand: 'baldoria',
      logo: baldoria_logo,
      product_type: 'Vermouth',
      last_update: '02 May, 2022',
      type_of_product: 'Vermouth',
      city: 'Boves',
      country: 'Italy',
    },
    {
      id: 2,
      brand: 'Erika',
      logo: erika_logo,
      product_type: 'Vodka & Gin',
      last_update: '12 Dec, 2022',
      type_of_product: 'Vodka & Gin ',
      city: 'Cognac',
      country: 'France',
    },
  ];
  return (
    <SaasLayout>
      <SaasHeader title='Brands' />
      <div className='mt-10 flex flex-row gap-x-9'>
        <Search onSearch={handleSearch} />
        <div className='hidden md:block  '>
          <Button variant='saasPrimary'>{'+ Add Brand'}</Button>
        </div>
      </div>
      <div className='hidden md:block mt-14'>
        <SaasBrandTable brand_data={SaasBrandTableData} />
      </div>
      <div className='md:hidden flex flex-col mt-6 gap-y-4 '>
        {SaasBrandTableData.map((data) => (
          <BrandCard brand_data={data} />
        ))}
      </div>
      <div className='md:hidden block pt-14'>
        <Button variant='saasPrimary' className='w-full'>
          {'+ Add Brand'}
        </Button>
      </div>
    </SaasLayout>
  );
};

export default SaasBrand;
