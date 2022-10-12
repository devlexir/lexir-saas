// import { useLogoutMutation } from '@framework/auth/use-logout';
import SaasAccountName from './saas-account';
import { LogoutIcon } from '@assets/icons/Logount-icon';
import { ChevronDoubleLeft } from '@components/icons/chevron-double-left';
import Link from '@components/ui/link';
import Logo from '@components/ui/logo';
import Scrollbar from '@components/ui/scrollbar';
import { useUI } from '@contexts/ui.context';
import { useRouter } from 'next/router';

type Option = {
  name: string;
  slug: string;
  icon?: JSX.Element;
};

export default function AccountNavMobile({ options }: { options: Option[] }) {
  const { closeSidebar } = useUI();

  const { pathname } = useRouter();
  const newPathname = pathname.split('/').slice(2, 3);
  const mainPath = `/${newPathname[0]}`;

  const ListMenu = ({ data, menuIndex, className = '', menuPath }: any) =>
    data.name && (
      <li className={`transition-colors duration-200 ${className}`}>
        <Link key={data.slug} href={data.slug}>
          <a
            onClick={closeSidebar}
            className={`mb-1 flex cursor-pointer items-left py-3.5 px-3.5 text-base text-brand-dark  ${
              mainPath === menuPath
                ? 'bg-fill-secondary font-medium'
                : 'font-normal'
            }`}
          >
            <span className='flex w-9 shrink-0 justify-left xl:w-10'>
              {data.icon}
            </span>
            <span className='ltr:pl-1 lg:rtl:pr-1.5'>{data.name}</span>
          </a>
        </Link>
      </li>
    );

  return (
    <>
      <div className='flex h-full w-full flex-col justify-between'>
        <div className='relative flex shadow-header-shadow w-full shrink-0 items-center py-0.5 ltr:pl-5 rtl:pr-5 md:ltr:pl-7 md:rtl:pr-7'>
          <button
            className='z-30 flex items-center justify-center px-4 py-5 text-2xl transition-opacity hover:opacity-60 focus:outline-none md:px-5 lg:py-8'
            onClick={closeSidebar}
            aria-label='close'
          >
            <ChevronDoubleLeft />
          </button>
          <div className='flex justify-center  items-center absolute inset-x-0'>
            <div onClick={closeSidebar} className='mt-2'>
              <Logo />
            </div>
          </div>
        </div>
        <div className='pt-16 px-8'>
          <SaasAccountName user='Leandro Alves' company_name='Company Name' />
        </div>
        <Scrollbar className='flex-grow'>
          <div className='flex flex-col px-0 py-6 text-brand-dark '>
            <ul className='px-6 pt-12'>
              {options.map((menu, index) => {
                const menuPathname = menu.slug.split('/').slice(2, 3);
                const menuPath = `/${menuPathname[0]}`;
                const menuName: string = `sidebar-menu-${index}`;

                return (
                  <ListMenu
                    data={menu}
                    menuName={menuName}
                    key={menuName}
                    menuIndex={index}
                    menuPath={menuPath}
                  />
                );
              })}
              <button
                className='mb-1 flex cursor-pointer items-center py-3.5 px-3.5 text-base text-brand-dark focus:outline-none xl:px-4'
                // onClick={() => logout()}
                onClick={() => console.log('Logout Clicked!')}
              >
                <span className='flex w-9 shrink-0 justify-left xl:w-10'>
                  <LogoutIcon className='h-5 w-5 md:h-[22px] md:w-[22px]' />
                </span>
                <span className='ltr:pl-1 lg:rtl:pr-1.5'>{'Logout'}</span>
              </button>
            </ul>
          </div>
        </Scrollbar>
      </div>
    </>
  );
}
