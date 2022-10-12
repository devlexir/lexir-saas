/* General Atoms */
import { useState } from 'react';

import type { GetServerSideProps } from 'next';

import PageHeader from '@components/atoms/pageHeader';
import BrandCard from '@components/brands/brand-card';
import Layout from '@components/layouts/admin';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import EmptyUser from '@components/users/empty-user';
import UsersList from '@components/users/users-list';

import { superAdminOnly } from '@utils/auth-utils';
import { getSubdomain } from '@utils/request-utils';

import { useUsersQuery } from '@data/users/use-users.query';
import { SortOrder } from '@ts-types/generated';

export default function Users() {
  const [page, setPage] = useState(1);

  const [orderBy, setOrder] = useState('created_at');
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);

  const { subdomain: subdomain } = getSubdomain();

  const {
    data,
    isLoading: loading,
    error,
  } = useUsersQuery({
    subdomain: subdomain,
  });

  if (loading) return <Loader text='Loading' />;
  if (error) return <ErrorMessage message={error.message} />;

  // function handleSearch({ searchText }: { searchText: string }) {
  //   setSearchTerm(searchText);
  //   setPage(1);
  // }

  function handlePagination(current: any) {
    setPage(current);
  }
  return (
    <>
      <div className='mb-4 bg-[#F9F9F9] lg:sticky lg:top-[72px] lg:z-[30] lg:w-full lg:border-b-2 lg:border-l-2 lg:border-gray-100 lg:px-4'>
        <PageHeader
          title='Users'
          subtitle='Overview'
          datepicker={false}
          addButton={{
            title: '+ NEW User',
            href: '/users/create',
          }}
        />
      </div>
      <div className='lg:mt-6 lg:px-4'>
        {data.users.data.length > 0 ? (
          <>
            <div className='hidden md:block'>
              {loading ? null : (
                <UsersList
                  customers={data?.users}
                  onPagination={handlePagination}
                  onOrder={setOrder}
                  onSort={setColumn}
                  title='Users List'
                />
              )}
            </div>
            <div className='block lg:hidden'>
              <div className='flex space-x-5'>
                <div className='grid w-full grid-cols-1'>
                  <div className='block md:hidden'>
                    {data?.users?.data.map((users: any) => (
                      <BrandCard brands={users} key={users.id} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <EmptyUser />
        )}
      </div>
    </>
  );
}

Users.authenticate = {
  permissions: superAdminOnly,
};

Users.Layout = Layout;

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
