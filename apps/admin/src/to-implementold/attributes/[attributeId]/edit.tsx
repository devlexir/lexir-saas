import { GetStaticPaths } from 'next';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import CreateOrUpdateAttributeForm from '@components/attribute/attribute-form';
import Layout from '@components/layouts/admin';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';

import { useAttributeQuery } from '@data/attributes/use-attribute.query';

export default function UpdateAttributePage() {
  const { t } = useTranslation();
  const router = useRouter();
  const {
    data,
    isLoading: loading,
    error,
  } = useAttributeQuery(router.query.attributeId as string);
  if (loading) return <Loader text='Loading' />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <div className='py-5 sm:py-8 flex border-b border-dashed border-border-base'>
        <h1 className='text-lg font-semibold text-heading'>
          {t('form:edit-attribute')}
        </h1>
      </div>
      <CreateOrUpdateAttributeForm initialValues={data?.attribute} />
    </>
  );
}

export const getStaticProps = async () => ({
  props: {},
});
export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};
UpdateAttributePage.Layout = Layout;
