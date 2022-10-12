import InputContainer from '../input-header';
import AccountBasicInfoForm from '@components/ui/form/saas/account-basic-info-form';
import React from 'react';

const AccountBasicInfo = () => {
  return (
    <InputContainer title='Basic Info' children={<AccountBasicInfoForm />} />
  );
};

export default AccountBasicInfo;
