import InputContainer from '../input-header';
import AccountDetailsInput from './account-details';
import EmailAccountDetailForm from '@components/ui/form/saas/email-account-detail-form';
import PasswordAccountDetailForm from '@components/ui/form/saas/password-account-detail-form';
import React from 'react';

export const AccountInputs = () => {
  let accountDetailsData = [
    {
      input: 'Email',
      placeholder: 'jlalvesdesousa@lupum.com',
      children: <EmailAccountDetailForm />,
    },
    {
      input: 'Password',
      placeholder: '*******************',
      children: <PasswordAccountDetailForm />,
    },
    {
      input: 'Two-factor authentication',
      placeholder: 'Not Enabled',
      children: <div>TESTE</div>,
    },
  ];
  return (
    <InputContainer
      title='Account Details'
      children={accountDetailsData.map((detail) => (
        <AccountDetailsInput
          input={detail.input}
          placeholder={detail.placeholder}
          children={detail.children}
        />
      ))}
    />
  );
};
