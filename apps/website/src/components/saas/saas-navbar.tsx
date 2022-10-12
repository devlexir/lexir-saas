import { LogoutIcon } from '@assets/icons/Logount-icon';
import Link from 'next/link';
import { useRouter } from 'next/router';

// import { useLogoutMutation } from '@framework/auth/use-logout';
// import LogoutIcon from '@components/icons/account-logout';

type Option = {
  name: string;
  slug: string;
  icon?: JSX.Element;
};

export default function SaasNav({ options }: { options: Option[] }) {
  // const { mutate: logout } = useLogoutMutation();
  const { pathname } = useRouter();
  const newPathname = pathname.split('/').slice(2, 3);
  const mainPath = `/${newPathname[0]}`;
  return (
    <nav className='flex flex-col overflow-hidden rounded-md  pb-2 md:pb-6'>
      {options.map((item) => {
        const menuPathname = item.slug.split('/').slice(2, 3);
        const menuPath = `/${menuPathname[0]}`;

        return (
          <Link key={item.slug} href={item.slug}>
            <a
              className={`mb-1 flex cursor-pointer items-left py-3.5 px-3.5 text-base text-brand-dark  ${
                mainPath === menuPath
                  ? 'bg-fill-secondary font-medium'
                  : 'font-normal'
              }`}
            >
              <span className='flex w-9 shrink-0 justify-left xl:w-10'>
                {item.icon}
              </span>
              <span className='ltr:pl-1 lg:rtl:pr-1.5'>{item.name}</span>
            </a>
          </Link>
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
    </nav>
  );
}
