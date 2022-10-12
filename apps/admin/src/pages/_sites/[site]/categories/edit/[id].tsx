import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import CreateOrUpdateCategoriesForm from '@components/category/category-form';
import Layout from '@components/layouts/admin';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';

import { useCategoryQuery } from '@data/category/use-category.query';

export default function UpdateCategoriesPage() {
  const { query } = useRouter();
  const { t } = useTranslation();
  const {
    data,
    isLoading: loading,
    error,
  } = useCategoryQuery(query.id as string);

  if (loading) return <Loader text='Loading' />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <div className='flex border-b border-dashed border-border-base py-5 sm:py-8'>
        <h1 className='text-lg font-semibold text-heading'>
          {t('form:form-title-edit-category')}
        </h1>
      </div>

      <CreateOrUpdateCategoriesForm initialValues={data} />
    </>
  );
}

UpdateCategoriesPage.Layout = Layout;

export const getServerSideProps = async () => ({
  props: {},
});
