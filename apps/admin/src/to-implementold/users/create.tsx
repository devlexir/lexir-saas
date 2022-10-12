import Layout from '@components/layouts/admin';
import CustomerCreateForm from '@components/user/user-form';
import type { GetStaticPaths } from 'next';
import { useTranslation } from 'next-i18next';
export default function CreateCustomerPage() {
  const { t } = useTranslation();
  return (
    <>
      <div className='flex border-b border-dashed border-border-base py-5 sm:py-8'>
        <h1 className='text-lg font-semibold text-heading'>
          {t('form:form-title-create-customer')}
        </h1>
      </div>
      <CustomerCreateForm />
    </>
  );
}
CreateCustomerPage.Layout = Layout;

export const getStaticProps = async () => ({
  props: {
    //...(await serverSideTranslations(locale, ["table", "form", "common"])),
  },
});

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};
