import { Fragment } from 'react';

import { useTranslation } from 'next-i18next';

import MarketDropdown from '@components/atoms/marketDropdown';
import MobileNavigation from '@components/layouts/navigation/mobile-navigation';
import SidebarItem from '@components/layouts/navigation/sidebar-item';
import Navbar from '@components/layouts/navigation/top-navbar';

import {
  getAuthCredentials,
  hasAccess,
  superAdminOnly,
} from '@utils/auth-utils';

import { siteSettings } from '@settings/site.settings';

const AdminLayout: React.FC = ({ children }) => {
  const { t } = useTranslation();

  const { permissions: currentUserPermissions } = getAuthCredentials();

  const SidebarItemMap = () => (
    <Fragment>
      {siteSettings.sidebarLinks.admin.map(
        ({ href, label, icon, iconActivated, permissions }) => {
          if (!hasAccess(permissions, currentUserPermissions)) return null;
          return (
            <div className='border-b' key={href}>
              <SidebarItem
                href={href}
                label={t(label)}
                icon={icon}
                iconActivated={iconActivated}
                key={href}
              />
            </div>
          );
        }
      )}
    </Fragment>
  );

  return (
    <div className='font-lato flex min-h-screen flex-col bg-[#F9F9F9] transition-colors duration-150'>
      <Navbar />
      <MobileNavigation>
        <SidebarItemMap />
      </MobileNavigation>

      <div className='flex flex-1 pt-20 '>
        <aside className='xl:w-76 fixed bottom-0 hidden h-full w-72 overflow-y-auto pl-4 pt-22 shadow start-0 lg:block'>
          {hasAccess(superAdminOnly, currentUserPermissions) ? (
            <div className='flex flex-col space-y-6 py-3 pr-4'>
              {/* <BrandsDropdown /> */}
              <MarketDropdown />
            </div>
          ) : null}

          <div className=' flex flex-col pt-4 '>
            <SidebarItemMap />
          </div>
        </aside>
        <main className='xl:ps-76 w-full lg:ps-72'>
          <div className='-mt-5 h-full p-5 lg:p-0'>{children}</div>
        </main>
      </div>
    </div>
  );
};
export default AdminLayout;
