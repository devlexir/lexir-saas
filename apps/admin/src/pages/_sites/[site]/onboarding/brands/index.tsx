/* General Atoms */
import { useState } from 'react';

import PageHeader from '@components/atoms/pageHeader';
import SearchBarBrands from '@components/atoms/searchBar/search-bar-brands';
import BrandCard from '@components/brands/brand-card';
import EmptyBrand from '@components/brands/empty-brand';
import Layout from '@components/layouts/admin';
import BrandsOnboardingList from '@components/onboarding/brand/brands-onboarding-list';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';

import { superAdminOnly } from '@utils/auth-utils';

import { useOnboardingBrandsQuery } from '@data/onboarding-brand/use-onboarding-brands.query';
import { SortOrder } from '@ts-types/generated';

const OnboardingBrands = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  const [orderBy, setOrder] = useState('created_at');
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);

  const [visible, setVisible] = useState(false);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');

  const toggleVisible = () => {
    setVisible((v) => !v);
  };

  const {
    data,
    isLoading: loading,
    error,
  } = useOnboardingBrandsQuery({
    subdomain: 'admin',
  });

  if (loading) return <Loader text='Loading' />;
  if (error) return <ErrorMessage message={error.message} />;

  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
    setPage(1);
  }
  function handlePagination(current: any) {
    setPage(current);
  }

  return (
    <>
      <div className='mb-4'>
        <PageHeader
          title='Brands Onboarding'
          subtitle='Overview'
          datepicker={false}
          addButton={{
            title: '+ NEW Brand Onboarding',
            href: '/onboarding/brands/create',
          }}
          onClick={() => {}}
        />
      </div>

      <SearchBarBrands
        handleSearch={handleSearch}
        toggleVisible={toggleVisible}
        visible={visible}
        setPage={setPage}
        setCategory={setCategory}
        setType={setType}
      />

      {data.brands.data.length > 0 ? (
        <>
          <div className='hidden md:block'>
            {loading ? null : (
              <BrandsOnboardingList
                customers={data?.brands}
                onPagination={handlePagination}
                onOrder={setOrder}
                onSort={setColumn}
                title='Onboarding Brands List'
              />
            )}
          </div>
          <div className='block lg:hidden'>
            <div className='flex space-x-5'>
              <div className='grid w-full grid-cols-1'>
                <div className='block md:hidden '>
                  {data?.brands?.data.map((brands: any) => (
                    <BrandCard brands={brands} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <EmptyBrand />
      )}
    </>
  );
};

OnboardingBrands.authenticate = {
  permissions: superAdminOnly,
};

OnboardingBrands.Layout = Layout;

export default OnboardingBrands;
