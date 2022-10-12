import Link from '@components/ui/link';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';

interface MenuProps {
  data: any;
  className?: string;
}

const HeaderMenu: React.FC<MenuProps> = ({ data, className }) => {
  const { t } = useTranslation('menu');
  return (
    <nav className={cn('headerMenu relative flex w-full gap-x-10', className)}>
      {data?.map((item: any) => (
        <div
          className='menuItem group relative cursor-pointer py-3 '
          key={item.id}
        >
          <Link
            href={item.path}
            className='relative inline-flex items-center text-sm font-normal text-brand-dark before:absolute before:-bottom-[14px] before:h-[3px] before:w-0 before:bg-brand before:transition-all before:duration-300 before:ltr:right-0 rtl:left-0 lg:text-15px'
          >
            {item.label}
          </Link>
        </div>
      ))}
    </nav>
  );
};

export default HeaderMenu;
