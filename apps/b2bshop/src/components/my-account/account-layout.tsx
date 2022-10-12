import AccountNavMobile from './account-nav-mobile';
import MapIcon from '@components/icons/account-address';
import HelpIcon from '@components/icons/account-help';
import NotificationIcon from '@components/icons/account-notification';
import OrdersIcon from '@components/icons/account-order';
import SettingsIcon from '@components/icons/account-settings';
import AccountNav from '@components/my-account/account-nav';
import Container from '@components/ui/container';
import { ROUTES } from '@utils/routes';

const accountMenu = [
  {
    slug: ROUTES.ACCOUNT_SETTING,
    name: 'Account',
    icon: <SettingsIcon className='h-5 w-5 md:h-[22px] md:w-[22px]' />,
  },
  {
    slug: ROUTES.ORDERS,
    name: 'Orders',
    icon: <OrdersIcon className='h-5 w-5 md:h-[22px] md:w-[22px]' />,
  },
  {
    slug: ROUTES.ADDRESS,
    name: 'Address',
    icon: <MapIcon className='h-5 w-5 md:h-[22px] md:w-[22px]' />,
  },
  {
    slug: ROUTES.NOTIFICATION,
    name: 'Notification',
    icon: <NotificationIcon className='h-5 w-5 md:h-[22px] md:w-[22px]' />,
  },
  {
    slug: ROUTES.HELP_CENTER,
    name: 'Help center',
    icon: <HelpIcon className='h-5 w-5 md:h-[22px] md:w-[22px]' />,
  },
];

const AccountLayout: React.FunctionComponent<{}> = ({ children }) => {
  return (
    <div className='border-t border-b border-border-base'>
      <Container>
        <div className='mx-auto pt-10 pb-12 lg:pb-14 xl:max-w-screen-xl xl:pb-16 2xl:max-w-[1300px] 2xl:pt-12 2xl:pb-20'>
          <div className='flex w-full flex-col lg:flex-row'>
            <div className='lg:hidden'>
              <AccountNavMobile options={accountMenu} />
            </div>
            <div className='hidden w-72 shrink-0 ltr:mr-7 rtl:ml-7 lg:block xl:w-[385px] xl:ltr:mr-8 xl:rtl:ml-8'>
              <AccountNav options={accountMenu} />
            </div>

            <div className='mt-4 w-full rounded-md border border-border-base p-4 sm:p-5 lg:mt-0 lg:py-8 lg:px-7 2xl:py-10 2xl:px-12'>
              {children}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AccountLayout;
