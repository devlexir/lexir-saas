import LogoutIcon from '@components/icons/account-logout';
import { useLogoutMutation } from '@framework/basic-rest/auth/use-logout';
import { Listbox, Transition } from '@headlessui/react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { Fragment, useState, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';

type Option = {
  name: string;
  slug: string;
  icon?: JSX.Element;
};

export default function AccountNavMobile({ options }: { options: Option[] }) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { pathname } = router;
  const currentSelectedItem = pathname
    ? options.find((o) => o.slug === pathname)!
    : options[0];
  const [selectedItem, setSelectedItem] = useState<Option>(currentSelectedItem);
  useEffect(() => {
    setSelectedItem(currentSelectedItem);
  }, [currentSelectedItem]);

  function handleItemClick(slugs: any) {
    setSelectedItem(slugs);
    router.push(slugs.slug);
  }
  const { mutate: logout } = useLogoutMutation();

  return (
    <Listbox value={selectedItem} onChange={handleItemClick}>
      {({ open }) => (
        <div className='relative w-full font-body'>
          <Listbox.Button className='itemss-center relative flex w-full cursor-pointer rounded border border-border-base p-4 text-brand-dark focus:outline-none ltr:text-left rtl:text-right md:p-5'>
            {selectedItem?.icon}
            <span className='relative flex items-center truncate text-base font-medium ltr:pl-2.5 rtl:pr-2.5'>
              {t(selectedItem?.name)}
            </span>
            <span className='pointer-events-none absolute inset-y-0 flex items-center ltr:right-4 rtl:left-4 md:ltr:right-5 md:rtl:left-5'>
              <FaChevronDown
                className='h-3 w-3 text-brand-dark text-opacity-70 md:h-3.5 md:w-3.5'
                aria-hidden='true'
              />
            </span>
          </Listbox.Button>
          <Transition
            show={open}
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options
              static
              className='absolute z-20 mt-1.5 max-h-72 w-full overflow-auto rounded-md bg-brand-light py-2.5 text-sm shadow-dropDown focus:outline-none md:text-15px'
            >
              {options?.map((option, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-pointer py-3 px-4 md:px-5 ${
                      active
                        ? 'bg-fill-dropdown-hover text-brand-dark'
                        : 'bg-brand-light'
                    }`
                  }
                  value={option}
                >
                  {({ selected, active }) => (
                    <span className='flex items-center'>
                      {option?.icon}
                      <span
                        className={`block truncate ltr:pl-2.5 rtl:pr-2.5 md:ltr:pl-3 md:rtl:pr-3 ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {t(option?.name)}
                      </span>
                      {selected ? (
                        <span
                          className={`${active && 'text-amber-600'}
                                 absolute inset-y-0 flex items-center ltr:left-0 ltr:pl-3 rtl:right-0 rtl:pr-3`}
                        />
                      ) : null}
                    </span>
                  )}
                </Listbox.Option>
              ))}
              <button
                className='flex w-full cursor-pointer items-center px-4 py-3 text-sm text-brand-dark focus:outline-none md:px-5 lg:text-15px'
                onClick={() => logout()}
              >
                <span className='flex shrink-0 justify-center'>
                  <LogoutIcon className='h-5 w-5 md:h-[22px] md:w-[22px]' />
                </span>
                <span className='block truncate ltr:pl-2.5 rtl:pr-2.5 md:ltr:pl-3 md:rtl:pr-3'>
                  {t('text-logout')}
                </span>
              </button>
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
}
