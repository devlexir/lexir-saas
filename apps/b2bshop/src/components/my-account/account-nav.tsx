import LogoutIcon from '@components/icons/account-logout';
import { useLogoutMutation } from '@framework/basic-rest/auth/use-logout';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Option = {
  name: string;
  slug: string;
  icon?: JSX.Element;
};

export default function AccountNav({ options }: { options: Option[] }) {
  const { mutate: logout } = useLogoutMutation();
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
              className={`mb-1 flex cursor-pointer items-center py-3.5 px-3.5 text-base text-brand-dark xl:px-4 ${
                mainPath === menuPath
                  ? 'bg-fill-secondary font-medium'
                  : 'font-normal'
              }`}
            >
              <span className='flex w-9 shrink-0 justify-center xl:w-10'>
                {item.icon}
              </span>
              <span className='ltr:pl-1 lg:rtl:pr-1.5'>{item.name}</span>
            </a>
          </Link>
        );
      })}
      <button
        className='mb-1 flex cursor-pointer items-center py-3.5 px-3.5 text-base text-brand-dark focus:outline-none  xl:px-4'
        onClick={() => logout()}
      >
        <span className='flex w-9 shrink-0 justify-center xl:w-10'>
          <LogoutIcon className='h-5 w-5 md:h-[22px] md:w-[22px]' />
        </span>
        <span className='ltr:pl-1 lg:rtl:pr-1.5'>{'Logout'}</span>
      </button>
    </nav>
  );
}
