import { CreditCardIcon } from '@assets/icons/CreditCardIcon';
import { LocationIcon } from '@assets/icons/LocationIcon';
import { NextBillingIcon } from '@assets/icons/NextBillingIcon';
import { UserIcon } from '@assets/icons/UserIcon';
import BillingInformation from '@components/saas/billing-details/billing-information';
import MobileBillingInformation from '@components/saas/billing-details/mobile-billing-information';
import MobilePastInvoiceTable from '@components/saas/billing-details/mobile-past-invoice';
import MobileProjectProfileTable from '@components/saas/billing-details/mobile-project-profile';
import PastInvoiceTable from '@components/saas/billing-details/past-invoice-table';
import ProjectProfileTable from '@components/saas/billing-details/project-profile-table';
import InputContainer from '@components/ui/saas/input-header';
import { SaasHeader } from '@components/ui/saas/saas-header';
import SaasLayout from '@components/ui/saas/saas-layout';
import React from 'react';

const BillingInformationData = [
  {
    id: 1,
    label: 'Credit card',
    input: 'Mastercard ending in 3887 expires on 4/23',
    icon: <UserIcon />,
  },
  { id: 2, label: 'Name', input: 'Leandro Alves', icon: <CreditCardIcon /> },
  {
    id: 3,
    label: 'Address',
    input: 'Agras Street 8798, 4000-458 Porto, Portugal',
    icon: <LocationIcon />,
  },
  {
    id: 4,
    label: 'Next billing',
    input: '9 April 2023',
    icon: <NextBillingIcon />,
  },
];

const ProjectProfileData = [
  {
    id: 1,
    project: 'Lexir',
    plan: 'Lorem impsum 48',
    price: '€19.25/month',
  },
];

const PastInvoiceData = [
  {
    id: 1,
    invoice: 'LXY-588-889',
    invoice_data: '01 Sep, 2022',
    amount: '€199.25',
    status: 'Paid',
    request_url: '/',
  },
  {
    id: 2,
    invoice: 'LXY-588-889',
    invoice_data: '01 Sep, 2022',
    amount: '€199.25',
    status: 'Paid',
    request_url: '/',
  },
  {
    id: 3,
    invoice: 'LXY-588-889',
    invoice_data: '01 Sep, 2022',
    amount: '€199.25',
    status: 'Refunded',
    request_url: '/',
  },
];

const BillingProfile = () => {
  return (
    <SaasLayout>
      <SaasHeader title='Billing Details' />
      <div className='hidden md:flex flex-col gap-y-10 py-10'>
        <InputContainer title='Billing Information'>
          <BillingInformation billing_data={BillingInformationData} />
        </InputContainer>
        <InputContainer title='Projects on this profile'>
          <ProjectProfileTable project_data={ProjectProfileData} />
        </InputContainer>
        <InputContainer title='Past invoices'>
          <PastInvoiceTable />
        </InputContainer>
      </div>
      <div className='md:hidden flex flex-col gap-y-10 py-10'>
        <MobileBillingInformation billing_data={BillingInformationData} />
        <MobileProjectProfileTable project_data={ProjectProfileData} />
        <MobilePastInvoiceTable invoice_data={PastInvoiceData} />
      </div>
    </SaasLayout>
  );
};

export default BillingProfile;
