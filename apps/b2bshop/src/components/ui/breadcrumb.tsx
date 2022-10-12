import React from 'react';
import ActiveLink from '@components/ui/active-link';
import useBreadcrumb, { convertBreadcrumbTitle } from '@utils/use-breadcrumb';
import { IoChevronForward } from 'react-icons/io5';
import { ROUTES } from '@utils/routes';
import HomeIconBreadcrumb from '@components/icons/home-icon-breadcrumb';

interface Props {
  children: any;
}

const BreadcrumbItem: React.FC<Props> = ({ children, ...props }) => {
  return (
    <li
      className='px-2.5 text-base text-brand-dark transition duration-200 ease-in ltr:first:pl-0 ltr:last:pr-0 rtl:first:pr-0 rtl:last:pl-0'
      {...props}
    >
      {children}
    </li>
  );
};

const BreadcrumbSeparator: React.FC<Props> = ({ children, ...props }) => {
  return (
    <li className='mt-[1px] text-base text-brand-dark' {...props}>
      {children}
    </li>
  );
};

export const BreadcrumbItems = (props: any) => {
  let children: any = React.Children.toArray(props.children);

  children = children.map((child: string, index: number) => (
    <BreadcrumbItem key={`breadcrumb_item${index}`}>{child}</BreadcrumbItem>
  ));

  const lastIndex = children.length - 1;

  children = children.reduce((acc: any, child: string, index: number) => {
    const notLast = index < lastIndex;
    if (notLast) {
      acc.push(
        child,
        <BreadcrumbSeparator key={`breadcrumb_sep${index}`}>
          {props.separator}
        </BreadcrumbSeparator>
      );
    } else {
      {
        acc.push(child);
      }
    }
    return acc;
  }, []);

  return (
    <div className='borobazarBreadcrumb flex items-center'>
      <ol className='flex w-full items-center overflow-hidden'>{children}</ol>
    </div>
  );
};

const Breadcrumb: React.FC<{ separator?: string }> = ({
  separator = (
    <IoChevronForward className='text-15px text-brand-dark text-opacity-40' />
  ),
}) => {
  const breadcrumbs = useBreadcrumb();
  ROUTES;
  return (
    <BreadcrumbItems separator={separator}>
      <ActiveLink
        href={ROUTES.HOME}
        activeClassName='font-semibold text-heading'
      >
        <a className='inline-flex items-center gap-x-4 pt-0.5 text-15px text-brand-dark ltr:mr-1.5 rtl:ml-1.5'>
          <HomeIconBreadcrumb />
          {'Home'}
        </a>
      </ActiveLink>

      {breadcrumbs?.map((breadcrumb: any) => (
        <ActiveLink
          href={breadcrumb.href}
          activeClassName='font-semibold text-heading'
          key={breadcrumb.href}
        >
          <a className='capitalize'>
            {convertBreadcrumbTitle(breadcrumb.breadcrumb)}
          </a>
        </ActiveLink>
      ))}
    </BreadcrumbItems>
  );
};

export default Breadcrumb;
