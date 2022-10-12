import AccountBasicInfo from '@components/ui/saas/account-details/account-basic-info';
import { AccountInputs } from '@components/ui/saas/account-details/account-inputs';
import { MobileAccountInfo } from '@components/ui/saas/account-details/mobile-account-info';
import { SaasHeader } from '@components/ui/saas/saas-header';
import SaasLayout from '@components/ui/saas/saas-layout';
import React from 'react';

const AccountDetails = () => {
  return (
    <SaasLayout>
      <SaasHeader title='My Account' />
      <div className='hidden py-10 gap-y-10 md:flex flex-col'>
        <AccountInputs />
        <AccountBasicInfo />
      </div>
      <div className='md:hidden py-10 gap-y-10 flex flex-col'>
        <MobileAccountInfo />
      </div>
    </SaasLayout>
  );
};

export default AccountDetails;
