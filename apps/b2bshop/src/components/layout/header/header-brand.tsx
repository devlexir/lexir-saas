import { useModalAction } from '@components/common/modal/modal.context';
import Search from '@components/common/search';
import MenuIcon from '@components/icons/menu-icon';
import UserIcon from '@components/icons/user-icon';
import HeaderMenu from '@components/layout/header/header-menu';
import { useUI } from '@contexts/ui.context';
import { siteSettings } from '@settings/site-settings-brand';
import { AddActiveScroll } from '@utils/add-active-scroll';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRef } from 'react';

const AuthMenu = dynamic(() => import('./auth-menu'), { ssr: false });
const CartButton = dynamic(() => import('@components/cart/cart-button'), {
  ssr: false,
});

type DivElementRef = React.MutableRefObject<HTMLDivElement>;
const { site_header } = siteSettings;

const Header: React.FC = () => {
  const { openSidebar, isAuthorized, displayMobileSearch } = useUI();
  const { openModal } = useModalAction();
  const { t } = useTranslation('common');
  const siteHeaderRef = useRef() as DivElementRef;

  AddActiveScroll(siteHeaderRef);
  function handleLogin() {
    openModal('LOGIN_VIEW');
  }
  function handleMobileMenu() {
    return openSidebar();
  }

  return (
    <header
      id='siteHeader'
      ref={siteHeaderRef}
      className={cn(
        'header-one sticky top-0 z-30 h-[57px] w-full shadow-card lg:h-[104px]',
        displayMobileSearch && 'active-mobile-search'
      )}
    >
      <div className='innerSticky body-font z-20 h-[57px] w-full bg-brand-light transition duration-200 ease-in-out lg:h-[104px]'>
        <Search className='top-bar-search absolute top-1 z-30 px-4 md:px-6 lg:max-w-[600px]' />
        {/* End of Mobile search */}
        <div className='flex h-full w-full items-center gap-x-10 px-8'>
          <div className='flex w-full shrink-0 lg:hidden'>
            <button
              aria-label='Menu'
              className='menuBtn z-20 mr-5 flex shrink-0 flex-col items-center justify-center outline-none focus:outline-none'
              onClick={handleMobileMenu}
            >
              <MenuIcon />
            </button>
          </div>
          <Image
            src={
              'https://cdn-lexir.s3.eu-west-3.amazonaws.com/images/brands/baldoriaLogo.png'
            }
            width={'257w'}
            height={'85h'}
            alt='Brand Logo'
            className='hidden lg:block'
          />
          <HeaderMenu data={null} className='hidden justify-end lg:flex' />
          <div className='flex shrink-0 gap-x-10'>
            <CartButton className='hidden py-3 lg:flex' />
            <div
              onClick={handleLogin}
              className='hidden shrink-0 items-center py-3 lg:flex'
            >
              <UserIcon className='text-brand-dark' />
              <AuthMenu
                isAuthorized={isAuthorized}
                btnProps={{
                  children: 'SIGN IN',
                }}
              >
                {'SIGN IN'}
              </AuthMenu>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
