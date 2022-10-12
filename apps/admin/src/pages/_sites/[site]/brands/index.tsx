import { useState } from 'react';

import type { GetServerSideProps } from 'next';

import PageHeader from '@components/atoms/pageHeader';
import BrandCard from '@components/brands/brand-card';
import BrandsList from '@components/brands/brands-list';
import EmptyBrand from '@components/brands/empty-brand';
import Layout from '@components/layouts/admin';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';

import { superAdminOnly } from '@utils/auth-utils';
import { getSubdomain } from '@utils/request-utils';

import { useBrandsQuery } from '@data/brand/use-brands.query';
import { SortOrder } from '@ts-types/generated';

export default function Brands() {
  const [page, setPage] = useState(1);

  const [orderBy, setOrder] = useState('created_at');
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);

  // ** States for Fitlers ** //

  const { subdomain: subdomain } = getSubdomain();

  const {
    data,
    isLoading: loading,
    error,
  } = useBrandsQuery({
    subdomain: subdomain,
  });

  if (loading) return <Loader text='Loading' />;
  if (error) return <ErrorMessage message={error.message} />;

  function handlePagination(current: any) {
    setPage(current);
  }
  return (
    <>
      <div className='mb-4 bg-[#F9F9F9] lg:sticky lg:top-[72px] lg:z-[30] lg:w-full lg:border-b-2 lg:border-l-2 lg:border-gray-100 lg:px-4'>
        <PageHeader
          title='Brands'
          subtitle='Overview'
          datepicker={false}
          addButton={{
            title: '+ NEW Brand',
            href: '/brands/create',
          }}
          onClick={() => {}}
        />
      </div>
      <div className='lg:mt-6 lg:px-4'>
        {data.brands.data.length > 0 ? (
          <>
            <div className='hidden md:block'>
              {loading ? null : (
                <BrandsList
                  customers={data?.brands}
                  onPagination={handlePagination}
                  onOrder={setOrder}
                  onSort={setColumn}
                  title='Brands List'
                />
              )}
            </div>
            <div className='block lg:hidden'>
              <div className='flex space-x-5'>
                <div className='grid w-full grid-cols-1'>
                  <div className='block md:hidden '>
                    {data?.brands?.data.map((brands: any) => (
                      <BrandCard brands={brands} key={brands.id} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <EmptyBrand />
        )}
      </div>
    </>
  );
}

Brands.authenticate = {
  permissions: superAdminOnly,
};

Brands.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale, query } = ctx;

  if (locale) {
    return {
      props: {
        subdomain: query.site,
      },
    };
  }

  return {
    props: {
      subdomain: query.site,
    },
  };
};
