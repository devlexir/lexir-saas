import { useUI } from '@contexts/ui.context';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

function checkIsActive(arr: any, item: string) {
  if (arr.includes(item)) {
    return true;
  }
  return false;
}

export const MenuItem: React.FC<any> = ({
  className = 'hover:bg-fill-base border-t border-border-base first:border-t-0 px-5 2xl:px-5 py-3 xl:py-3.5 2xl:py-2.5 3xl:py-3 h-16',
  item,
}: any) => {
  const router = useRouter();

  const pathname = '';
  const query = { brands: '' };

  const selectedCategories = useMemo(
    () => (query?.brands ? (query.brands as string).split(',') : []),
    [query?.brands]
  );

  const isActive =
    checkIsActive(selectedCategories, item.slug) ||
    item?.children?.some((_item: any) =>
      checkIsActive(selectedCategories, _item.slug)
    );

  const [isOpen, setOpen] = useState<boolean>(isActive);

  useEffect(() => {
    setOpen(isActive);
  }, [isActive]);

  const { slug, name, children: items } = item;

  const { displaySidebar, closeSidebar } = useUI();

  function toggleCollapse() {
    setOpen((prevValue) => !prevValue);
  }

  function onClick() {
    if (Array.isArray(items) && !!items.length) {
      toggleCollapse();
    } else {
      const { brands, ...restQuery } = query;
      let currentFormState = selectedCategories.includes(slug)
        ? selectedCategories.filter((i) => i !== slug)
        : [...selectedCategories, slug];
      router.push(
        {
          pathname,
          query: {
            ...restQuery,
            ...(!!currentFormState.length
              ? { brands: currentFormState.join(',') }
              : {}),
          },
        },
        undefined,
        { scroll: false }
      );

      displaySidebar && closeSidebar();
    }
  }

  return (
    <>
      <li
        onClick={onClick}
        className={cn(
          'flex items-center justify-between text-xs transition md:text-sm lg:text-sm',
          { 'bg-fill-two': isOpen },
          className
        )}
      >
        <span className='py-0.5 capitalize text-brand-dark'>{name}</span>
      </li>
    </>
  );
};
