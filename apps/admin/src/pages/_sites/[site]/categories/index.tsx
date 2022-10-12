import { useState } from 'react';

import type { GetStaticPaths } from 'next';
import { useTranslation } from 'next-i18next';

import CategoryList from '@components/category/category-list';
import { Card } from '@components/common/card';
import Search from '@components/common/search';
import Layout from '@components/layouts/admin';
import ErrorMessage from '@components/ui/error-message';
import LinkButton from '@components/ui/link-button';
import Loader from '@components/ui/loader/loader';

import { adminOnly } from '@utils/auth-utils';
import { ROUTES } from '@utils/routes';

import { useCategoriesQuery } from '@data/category/use-categories.query';
import { SortOrder } from '@ts-types/generated';

export default function Categories() {
  const [searchTerm, setSearchTerm] = useState('');
  const [type, setType] = useState('');
  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  const [orderBy, setOrder] = useState('created_at');
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const {
    data,
    isLoading: loading,
    error,
  } = useCategoriesQuery({
    limit: 20,
    page,
    type,
    text: searchTerm,
    orderBy,
    sortedBy,
    parent: null,
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
      <Card className='mb-8 flex flex-col'>
        <div className='flex w-full flex-col items-center md:flex-row'>
          <div className='mb-4 md:mb-0 md:w-1/4'>
            <h1 className='text-xl font-semibold text-heading'>
              {t('form:input-label-categories')}
            </h1>
          </div>

          <div className='flex w-full flex-col items-center space-y-4 ms-auto md:flex-row md:space-y-0 xl:w-1/2'>
            <Search onSearch={handleSearch} />

            <LinkButton
              href={`${ROUTES.CATEGORIES}/create`}
              className='h-12 w-full md:w-auto md:ms-6'
            >
              <span className='block md:hidden xl:block'>
                + {t('form:button-label-add-categories')}
              </span>
              <span className='hidden md:block xl:hidden'>
                + {t('form:button-label-add')}
              </span>
            </LinkButton>
          </div>
        </div>
      </Card>
      <CategoryList
        categories={data?.categories}
        onPagination={handlePagination}
        onOrder={setOrder}
        onSort={setColumn}
      />
    </>
  );
}

Categories.authenticate = {
  permissions: adminOnly,
};
Categories.Layout = Layout;

export const getStaticProps = async () => ({
  props: {},
});

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};
