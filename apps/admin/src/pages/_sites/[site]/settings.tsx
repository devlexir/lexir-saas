import type { GetStaticPaths } from 'next';
import { useTranslation } from 'next-i18next';

import AdminLayout from '@components/layouts/admin';
import SettingsForm from '@components/settings/settings-form';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';

// import { useTaxesQuery } from '@data/tax/use-taxes.query'
import { adminOnly } from '@utils/auth-utils';

import { useSettingsQuery } from '@data/settings/use-settings.query';
import { useShippingClassesQuery } from '@data/shipping/use-shippingClasses.query';

export default function Settings() {
  const { t } = useTranslation();
  // const { data: taxData, isLoading: taxLoading } = useTaxesQuery()
  const { data: ShippingData, isLoading: shippingLoading } =
    useShippingClassesQuery();

  const { data, isLoading: loading, error } = useSettingsQuery();

  if (loading || shippingLoading) return <Loader text='Loading' />;
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <>
      <div className='flex border-b border-dashed border-border-base py-5 sm:py-8'>
        <h1 className='text-lg font-semibold text-heading'>
          {t('form:form-title-settings')}
        </h1>
      </div>
      <SettingsForm
        settings={data?.options}
        taxClasses={[]}
        shippingClasses={ShippingData?.shippingClasses}
      />
    </>
  );
}
Settings.authenticate = {
  permissions: adminOnly,
};
Settings.Layout = AdminLayout;

export const getStaticProps = async () => ({
  props: {},
});

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};
