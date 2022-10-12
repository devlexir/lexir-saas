import PageHeader from '@components/atoms/pageHeader';
import IntegrationsList from '@components/integrations/integrations-list';
import Layout from '@components/layouts/admin';

import { superAdminAndAdminAndBrandOnly } from '@utils/auth-utils';

const Integrations = () => {
  return (
    <>
      <div className='b-4 bg-[#F9F9F9] lg:sticky lg:top-[72px] lg:z-[800] lg:w-full lg:border-b-2 lg:border-l-2 lg:border-gray-100 lg:px-4'>
        <PageHeader
          title='Integrations'
          subtitle='Connect your favorite tools'
          datepicker={false}
        />
      </div>
      <IntegrationsList />
    </>
  );
};

export default Integrations;

Integrations.authenticate = {
  permissions: superAdminAndAdminAndBrandOnly,
};

Integrations.Layout = Layout;
