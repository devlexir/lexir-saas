import Drawer from '../drawer';
import DrawerWrapper from '../drawer-wrapper';
import Logo from '../logo';
import { CardIcon } from '@assets/icons/Card';
import { SettingsIcon } from '@assets/icons/Settings';
import { TagMenuIcon } from '@assets/icons/TagMenuIcon';
import SaasAccountName from '@components/saas/saas-account';
import SaasNav from '@components/saas/saas-navbar';
import AccountNavMobile from '@components/saas/saas-navbar-mobile';
import { useUI } from '@contexts/ui.context';
import React from 'react';

interface ISaasLayout {
  children: any;
}

const accountMenu = [
  {
    slug: '/saas/brand',
    name: 'Brands',
    icon: <TagMenuIcon />,
  },
  {
    slug: '/saas/billing-profile',
    name: 'Billing Profile',
    icon: <CardIcon />,
  },

  {
    slug: '/saas/account-details',
    name: 'Account details',
    icon: <SettingsIcon />,
  },
];

const SaasLayout = ({ children }: ISaasLayout) => {
  const { closeSidebar, openSidebar, displaySidebar } = useUI();
  return (
    <div className='mx-auto max-w-[1920px]'>
      {/* <Container> */}
      <div className='mx-auto '>
        <div className='lg:hidden'>
          <DrawerWrapper onClose={openSidebar}>
            <Drawer variant='left' open={displaySidebar} onClose={closeSidebar}>
              <AccountNavMobile options={accountMenu} />
            </Drawer>
          </DrawerWrapper>
        </div>
        <div className='flex w-full flex-row min-h-screen '>
          <div className='lg:flex hidden w-80 shrink-0 ltr:mr-7 rtl:ml-7 flex-col items-center pl-8 pr-7 pt-10 pb-12 lg:pb-14 xl:pb-16 2xl:pt-12 2xl:pb-20'>
            <div className='pt-6'>
              <Logo />
            </div>
            <div className='pt-28'>
              <SaasAccountName
                user='Leandro Alves'
                company_name='Company Name'
              />
            </div>
            <div className='pt-12 w-full '>
              <SaasNav options={accountMenu} />
            </div>
          </div>

          <div className='p-6 md:p-0 md:pt-12 md:pl-14 md:pr-9 w-full rounded-md bg-fill-secondary h-full min-h-screen'>
            {children}
          </div>
        </div>
      </div>
      {/* </Container> */}
    </div>
  );
};

export default SaasLayout;
