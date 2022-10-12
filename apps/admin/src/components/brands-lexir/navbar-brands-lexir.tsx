import { CloseIconMenu } from '@assets/brands-lexir/close-icon-menu';
import { NavbarIcon } from '@components/icons/navbar-icon';
import Logo from '@components/ui/logo';
import { Transition } from '@headlessui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const NavbarBrandsLexir = () => {
  const [isShowing, setIsShowing] = useState(false);
  const router = useRouter();

  return (
    <>
      <div
        className={`${
          isShowing ? 'opacity-100' : 'opacity-95'
        } sticky top-0 z-50 hidden h-20 w-full max-w-[1920px] bg-white sm:px-5 md:flex md:px-10 lg:px-20`}
      >
        <div className=' flex h-full w-full justify-center text-[#2d2d2d] opacity-100'>
          <div className='flex w-full flex-row items-center justify-between text-sm'>
            <Link href='/'>
              <Logo className='cursor-pointer' />
            </Link>
            <div className='hidden md:block'>
              <span className='flex items-center justify-between gap-10'>
                <Link href='https://shop.lexir.com/'>
                  <a target='_blank' className='cursor-pointer uppercase'>
                    Lexir Shop
                  </a>
                </Link>
                <Link href='https://business.lexir.com/'>
                  <a target='_blank' className='cursor-pointer uppercase'>
                    Business Buyers
                  </a>
                </Link>
                {router.pathname === '/get-started' ? null : (
                  <Link href='/get-started'>
                    <a className='rounded-md bg-[#2d2d2d] py-2 px-4 text-white hover:bg-[#3e3e3e]'>
                      SIGN UP
                    </a>
                  </Link>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${
          isShowing ? 'opacity-100' : 'opacity-95'
        }  top-0 z-50 flex h-20 w-full justify-center md:hidden`}
      >
        <div className=' flex h-full w-full text-[#2d2d2d] opacity-100 md:mx-12'>
          <div className='flex w-full flex-row items-center justify-between  text-sm'>
            <Link href='/'>
              <Logo className='cursor-pointer' />
            </Link>
            <div className='block md:hidden'>
              <button onClick={() => setIsShowing((isShowing) => !isShowing)}>
                <Transition
                  show={isShowing}
                  enter='transition-opacity duration-150'
                  enterFrom='opacity-0'
                  enterTo='opacity-100'
                  leave='transition-opacity duration-75'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <CloseIconMenu />
                </Transition>
                <Transition
                  show={!isShowing}
                  enter='transition-opacity duration-150'
                  enterFrom='opacity-0'
                  enterTo='opacity-100'
                  leave='transition-opacity duration-75'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <NavbarIcon className='rotate-180' />
                </Transition>
              </button>
              <div className='rigth-0 absolute top-20 left-0 z-[999] mx-auto bg-white'>
                <Transition
                  show={isShowing}
                  enter='transition-opacity duration-500'
                  enterFrom='opacity-0'
                  enterTo='opacity-100'
                  leave='transition-opacity duration-300'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <div className=' h-screen w-screen'>
                    <span className='flex flex-col items-center justify-between gap-2 pb-10 pt-24'>
                      <Link href='https://shop.lexir.com/'>
                        <a
                          target='_blank'
                          className='my-6 cursor-pointer border-b text-lg uppercase '
                        >
                          Lexir Shop
                        </a>
                      </Link>
                      <Link href='https://business.lexir.com/'>
                        <a
                          target='_blank'
                          className='my-6 cursor-pointer border-b text-lg uppercase'
                        >
                          Business Buyers
                        </a>
                      </Link>
                      <Link href='/get-started'>
                        <a className='my-6 rounded-md bg-[#2d2d2d] py-2 px-4 text-lg text-white hover:bg-[#3e3e3e]'>
                          GET STARTED
                        </a>
                      </Link>
                    </span>
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarBrandsLexir;
