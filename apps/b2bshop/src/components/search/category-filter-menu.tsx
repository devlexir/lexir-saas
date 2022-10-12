import { useFilter } from '@contexts/filter/filter.context';
import { useUI } from '@contexts/ui.context';
import cn from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import { FaCheck } from 'react-icons/fa';

function CategoryFilterMenuItem({
  className = 'hover:bg-fill-base border-t border-border-base first:border-t-0 px-5 2xl:px-5 py-3 xl:py-3.5 2xl:py-2.5 3xl:py-3 h-16',
  item,
  filterType,
  depth = 0,
}: any) {
  const { addFilter, filters } = useFilter();
  const query = { category: '' };
  const selectedCategories = useMemo(
    () => (query?.category ? (query.category as string).split(',') : []),
    [query?.category]
  );
  const isActive = filters[filterType].includes(item.slug);
  const [isOpen, setOpen] = useState<boolean>(isActive);
  const [subItemAction, setSubItemAction] = useState<boolean>(false);
  useEffect(() => {
    setOpen(isActive);
  }, [isActive]);
  const { slug, name, children: items, icon } = item;
  const { displaySidebar, closeSidebar } = useUI();

  function toggleCollapse() {
    setOpen((prevValue) => !prevValue);
  }

  function onClick() {
    if (Array.isArray(items) && !!items.length) {
      toggleCollapse();
    } else {
      addFilter(item, filterType);
      displaySidebar && closeSidebar();
    }
  }

  return (
    <>
      <li
        onClick={onClick}
        className={cn(
          'flex items-center justify-start text-xs transition md:text-sm lg:text-sm gap-3',
          { 'bg-fill-two': isOpen },
          className
        )}
      >
        {item.icon && <div className='shrink-0 '>{item.icon}</div>}
        <span className='py-0.5 capitalize text-brand-dark'>{name}</span>
        {depth > 0 && (
          <span
            className={`flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-border-four text-13px text-brand-light transition duration-500 ease-in-out group-hover:border-yellow-100 ltr:ml-auto rtl:mr-auto ${
              selectedCategories.includes(slug) &&
              'border-yellow-100 bg-yellow-100'
            }`}
          >
            {selectedCategories.includes(slug) && <FaCheck />}
          </span>
        )}
      </li>
    </>
  );
}

function CategoryFilterMenu({ items, className, filterType }: any) {
  return (
    <ul className={cn(className)}>
      {items?.map((item: any) => (
        <CategoryFilterMenuItem
          key={`${item.slug}-key-${item.id}`}
          item={item}
          filterType={filterType}
        />
      ))}
    </ul>
  );
}

export default CategoryFilterMenu;
