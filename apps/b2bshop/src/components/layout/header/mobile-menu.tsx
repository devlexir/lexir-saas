import Link from '@components/ui/link';
import Logo from '@components/ui/logo';
import Scrollbar from '@components/ui/scrollbar';
import { useUI } from '@contexts/ui.context';
import { siteSettings } from '@settings/site-settings';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import {
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoFacebook,
  IoLogoYoutube,
  IoClose,
} from 'react-icons/io5';

const social = [
  {
    id: 0,
    link: 'https://www.facebook.com/redqinc/',
    icon: <IoLogoFacebook />,
    className: 'facebook',
    title: 'text-facebook',
  },
  {
    id: 1,
    link: 'https://twitter.com/redqinc',
    icon: <IoLogoTwitter />,
    className: 'twitter',
    title: 'text-twitter',
  },
  {
    id: 2,
    link: 'https://www.youtube.com/channel/UCjld1tyVHRNy_pe3ROLiLhw',
    icon: <IoLogoYoutube />,
    className: 'youtube',
    title: 'text-youtube',
  },
  {
    id: 3,
    link: 'https://www.instagram.com/redqinc/',
    icon: <IoLogoInstagram />,
    className: 'instagram',
    title: 'text-instagram',
  },
];

export default function MobileMenu() {
  const [activeMenus, setActiveMenus] = useState<any>([]);
  const { site_header } = siteSettings;
  const { closeSidebar } = useUI();
  const { t } = useTranslation('menu');
  const handleArrowClick = (menuName: string) => {
    let newActiveMenus = [...activeMenus];
    if (newActiveMenus.includes(menuName)) {
      var index = newActiveMenus.indexOf(menuName);
      if (index > -1) {
        newActiveMenus.splice(index, 1);
      }
    } else {
      newActiveMenus.push(menuName);
    }
    setActiveMenus(newActiveMenus);
  };

  const ListMenu = ({
    dept,
    data,
    hasSubMenu,
    menuName,
    menuIndex,
    className = '',
  }: any) =>
    data.label && (
      <li className={`transition-colors duration-200 ${className}`}>
        <div className='relative flex items-center justify-between'>
          <Link
            href={data.path}
            className='menu-item relative w-full py-4 text-brand-dark transition duration-300 ease-in-out ltr:pl-5 ltr:pr-4 rtl:pr-5 rtl:pl-4 md:ltr:pl-7 md:rtl:pr-7'
          >
            <span className='block w-full' onClick={closeSidebar}>
              {t(`${data.label}`)}
            </span>
          </Link>
          {hasSubMenu && (
            <div
              className='absolute top-1/2 flex h-8 w-full shrink-0 -translate-y-1/2 transform cursor-pointer items-center justify-end px-5 text-[17px] text-brand-dark text-opacity-80 ltr:right-0 rtl:left-0'
              onClick={() => handleArrowClick(menuName)}
            >
              <IoIosArrowDown
                className={`transform transition duration-200 ease-in-out ${
                  activeMenus.includes(menuName) ? '-rotate-180' : 'rotate-0'
                }`}
              />
            </div>
          )}
        </div>
        {hasSubMenu && (
          <SubMenu
            dept={dept}
            data={data.subMenu}
            toggle={activeMenus.includes(menuName)}
            menuIndex={menuIndex}
          />
        )}
      </li>
    );

  const SubMenu = ({ dept, data, toggle, menuIndex }: any) => {
    if (!toggle) {
      return null;
    }

    dept = dept + 1;

    return (
      <ul className={cn('mobile-sub-menu', dept > 2 && 'ltr:-ml-4 rtl:-mr-4')}>
        {data?.map((menu: any, index: number) => {
          const menuName: string = `sidebar-submenu-${dept}-${menuIndex}-${index}`;

          return (
            <ListMenu
              dept={dept}
              data={menu}
              hasSubMenu={menu.subMenu}
              menuName={menuName}
              key={menuName}
              menuIndex={index}
              className={cn(
                dept > 1 && 'ltr:pl-4 rtl:pr-4',
                dept > 2 && 'ltr:pl-8 rtl:pr-8'
              )}
            />
          );
        })}
      </ul>
    );
  };

  return (
    <>
      <div className='flex h-full w-full flex-col justify-between'>
        <div className='relative flex w-full shrink-0 items-center justify-between border-b border-border-base py-0.5 ltr:pl-5 rtl:pr-5 md:ltr:pl-7 md:rtl:pr-7'>
          <div role='button' onClick={closeSidebar} className='inline-flex'>
            <Logo />
          </div>

          <button
            className='flex items-center justify-center px-4 py-5 text-2xl transition-opacity hover:opacity-60 focus:outline-none md:px-5 lg:py-8'
            onClick={closeSidebar}
            aria-label='close'
          >
            <IoClose className='mt-0.5 text-brand-dark' />
          </button>
        </div>

        <Scrollbar className='menu-scrollbar mb-auto flex-grow'>
          <div className='flex flex-col px-0 py-6 text-brand-dark '>
            <ul className='mobile-menu'>
              {site_header.menu.map((menu, index) => {
                const dept: number = 1;
                const menuName: string = `sidebar-menu-${dept}-${index}`;

                return (
                  <ListMenu
                    dept={dept}
                    data={menu}
                    hasSubMenu={menu.subMenu}
                    menuName={menuName}
                    key={menuName}
                    menuIndex={index}
                  />
                );
              })}
            </ul>
          </div>
        </Scrollbar>
      </div>
    </>
  );
}
