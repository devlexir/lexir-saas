import baldoria_logo from '../../../../../public/brands/baldoria-logo.png';
import { LastIcon } from '@assets/icons/LastIcon';
import { LocationIcon } from '@assets/icons/LocationIcon';
import { PlanIcon } from '@assets/icons/PlanIcon';
import { PriceIcon } from '@assets/icons/PriceIcon';
import { TagIcon } from '@assets/icons/Tag';
import BrandDetailsInformation from '@components/saas/brand-details/brand-details-information';
import CustomDoimain from '@components/saas/brand-details/custom-domain';
import MobileBrandDetailsInformation from '@components/saas/brand-details/mobile-brand-details-information';
import MobileCustomDoimain from '@components/saas/brand-details/mobile-custom-domain';
import Button from '@components/ui/button';
import { Chevron } from '@components/ui/chevron-icon';
import InputContainer from '@components/ui/saas/input-header';
import { SaasHeader } from '@components/ui/saas/saas-header';
import SaasLayout from '@components/ui/saas/saas-layout';
import Image from 'next/image';
import React from 'react';

const BillingInformationData = [
  {
    id: 1,
    label: 'Brand name',
    input: 'Baldoria',
    icon: <TagIcon />,
  },
  {
    id: 2,
    label: 'Created',
    input: '9 April, 2022',
    icon: <LocationIcon />,
  },
  {
    id: 3,
    label: 'Last update',
    input: '8 hours ago',
    icon: <LastIcon />,
  },
  {
    id: 4,
    label: 'Plan',
    input: 'Lorem impsum 48',
    icon: <PlanIcon />,
  },
  {
    id: 5,
    label: 'Price',
    input: '€19.25/month',
    icon: <PriceIcon />,
  },
];

const CustomDoimainData = {
  text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
  libero et velit interdum, ac aliquet odio mattis.`,
  subdomain: 'bohomiaparis.com',
};

const BrandDetails = () => {
  return (
    <SaasLayout>
      <>
        <SaasHeader title='Brand Details' />
        <div className='flex justify-center pt-8 md:hidden'>
          <Image src={baldoria_logo} width={140} height={50} />
        </div>
        <div className='md:flex justify-end pt-12 hidden '>
          <Button variant='saasPrimary' className='flex items-center gap-x-3'>
            <span className='pt-0.5'>{'Enter Brand'}</span>
            <Chevron fill='#FFFFFF' />
          </Button>
        </div>
      </>
      <div className='hidden md:flex flex-col gap-y-10 py-10'>
        <InputContainer title='Brand Information' logo={baldoria_logo}>
          <BrandDetailsInformation
            billing_information_data={BillingInformationData}
          />
        </InputContainer>
        <InputContainer title='Custom Domain'>
          <CustomDoimain custom_domain_data={CustomDoimainData} />
        </InputContainer>
      </div>
      <div className='md:hidden flex flex-col gap-y-10 py-10'>
        <div>
          <MobileBrandDetailsInformation
            billing_information_data={BillingInformationData}
          />
          <div className='flex justify-center md:hidden w-full mt-4'>
            <Button
              variant='saasPrimary'
              className='flex items-center gap-x-3 w-full'
            >
              <span className='pt-0.5'>{'Enter Brand'}</span>
              <Chevron fill='#FFFFFF' />
            </Button>
          </div>
        </div>

        <MobileCustomDoimain custom_domain_data={CustomDoimainData} />
      </div>
    </SaasLayout>
  );
};

export default BrandDetails;
