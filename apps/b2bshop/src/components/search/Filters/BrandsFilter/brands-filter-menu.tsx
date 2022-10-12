import cn from 'classnames';
import { useEffect, useMemo, useState } from 'react';

function checkIsActive(arr: any, item: string) {
  if (arr.includes(item)) {
    return true;
  }
  return false;
}

export const BrandFilterMenuItem: React.FC<any> = ({
  className = 'hover:bg-fill-base border-t border-border-base first:border-t-0 px-5 2xl:px-5 py-3 xl:py-3.5 2xl:py-2.5 3xl:py-3 h-16',
  item,
}: any) => {
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

  const { name, children: items, icon } = item;

  return (
    <>
      <li
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

function CategoryFilterMenu({ items, className, filters, setFilters }: any) {
  return (
    <ul className={cn(className)}>
      {items?.map((item: any) => (
        <BrandFilterMenuItem
          filters={filters}
          setFilters={setFilters}
          key={`${item.slug}-key-${item.id}`}
          item={item}
        />
      ))}
    </ul>
  );
}

export default CategoryFilterMenu;
