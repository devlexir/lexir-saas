import { useRouter } from 'next/router';

import * as sidebarIcons from '@components/icons/sidebar';
import Link from '@components/ui/link';

import { getIcon } from '@utils/get-icon';

import { useUI } from '@contexts/ui.context';

const SidebarItem = ({ href, icon, iconActivated, label }: any) => {
  const router = useRouter();

  const isNotRoutePath = router.asPath
    .replace(/\W|_/g, '')
    .includes(href.replace(/\W|_/g, ''));

  if (!isNotRoutePath && href !== '/') {
    return (
      <SidebarInactiveItem
        href={href}
        label={label}
        icon={icon}
        iconActivated={iconActivated}
      />
    );
  } else if (router.asPath === '/') {
    return (
      <SidebarActiveItem
        href={href}
        label={label}
        icon={icon}
        iconActivated={iconActivated}
      />
    );
  } else if (
    isNotRoutePath &&
    href !== '/' &&
    !router.asPath.includes('/onboarding/brands/')
  ) {
    return (
      <SidebarActiveItem
        href={href}
        label={label}
        icon={icon}
        iconActivated={iconActivated}
      />
    );
  } else if (href !== '/' && router.asPath.includes('/onboarding/brands/')) {
    return (
      <SidebarOnboardingItem
        href={href}
        label={label}
        icon={icon}
        iconActivated={iconActivated}
      />
    );
  } else {
    return (
      <SidebarInactiveItem
        href={href}
        label={label}
        icon={icon}
        iconActivated={iconActivated}
      />
    );
  }
};

const SidebarActiveItem = ({ href, iconActivated, label }: any) => {
  const { closeSidebar } = useUI();
  return (
    <span onClick={() => closeSidebar()}>
      <Link
        href={href}
        className='flex w-full items-center border-r-4 border-[#1C8C64] py-4 text-base 
        text-body-dark text-start hover:bg-[#F9F9F9] focus:text-accent'
      >
        {getIcon({
          iconList: sidebarIcons,
          iconName: iconActivated,
          className: 'w-6 h-6 me-4',
        })}
        <span className='text-base font-semibold text-[#1C8C64]'>{label}</span>
      </Link>
    </span>
  );
};

const SidebarInactiveItem = ({ href, icon, label }: any) => {
  const { closeSidebar } = useUI();
  return (
    <span onClick={() => closeSidebar()}>
      <Link
        href={href}
        className='flex w-full items-center py-4 text-base text-body-dark text-start 
        hover:bg-[#F9F9F9] hover:font-semibold focus:text-accent'
      >
        {getIcon({
          iconList: sidebarIcons,
          iconName: icon,
          className: 'w-6 h-6 me-4',
        })}
        <span className='text-base text-[#4F4F4F] '>{label}</span>
      </Link>
    </span>
  );
};

const SidebarOnboardingItem = ({ href, icon, iconActivated, label }: any) => {
  const { closeSidebar } = useUI();
  return href.includes('/onboarding/brands') ? (
    <span onClick={() => closeSidebar()}>
      <Link
        href={href}
        className='flex w-full items-center border-r-4 border-[#1C8C64] py-4 text-base 
      text-body-dark text-start hover:bg-[#F9F9F9] focus:text-accent'
      >
        {getIcon({
          iconList: sidebarIcons,
          iconName: iconActivated,
          className: 'w-6 h-6 me-4',
        })}
        <span className='text-base font-semibold text-[#1C8C64]'>{label}</span>
      </Link>
    </span>
  ) : (
    <span onClick={() => closeSidebar()}>
      <Link
        href={href}
        className='flex w-full items-center py-4 text-base text-body-dark text-start 
        hover:bg-[#F9F9F9] hover:font-semibold focus:text-accent'
      >
        {getIcon({
          iconList: sidebarIcons,
          iconName: icon,
          className: 'w-6 h-6 me-4',
        })}
        <span className='text-base text-[#4F4F4F] '>{label}</span>
      </Link>
    </span>
  );
};

export default SidebarItem;
