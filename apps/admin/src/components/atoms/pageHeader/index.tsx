/* General Atoms */
import DateRangePicker from '@components/atoms/dateRangePicker';
import LinkButton from '@components/ui/link-button';

import {
  getAuthCredentials,
  hasAccess,
  superAdminAndAdminOnly,
} from '@utils/auth-utils';

const PageHeader = (props: any) => {
  const { permissions: currentUserPermissions } = getAuthCredentials();
  return (
    <div className='flex content-center justify-between bg-transparent sm:h-full'>
      <div className='mt-4 mb-6 w-full flex-col justify-between sm:flex '>
        <span className='pt-2 text-32 font-bold text-[#4F4F4F]'>
          {props.title}
        </span>
        <div className='flex flex-col justify-between gap-y-4 pt-2 md:flex-row md:items-center'>
          <div className='flex w-full justify-start '>
            <span className='flex justify-start text-20 font-normal text-[#6F6F6F]'>
              {props.subtitle}
            </span>
          </div>
          {props.datepicker &&
          hasAccess(superAdminAndAdminOnly, currentUserPermissions) ? (
            <DateRangePicker />
          ) : null}
          {props.addButton &&
          hasAccess(superAdminAndAdminOnly, currentUserPermissions) ? (
            <LinkButton
              href={`${props.addButton.href}`}
              className='h-12 w-full md:w-auto md:ms-6'
            >
              <span className='block text-base font-light uppercase md:hidden xl:block	'>
                {props.addButton.title}
              </span>
              <span className='hidden text-base font-light uppercase md:block xl:hidden	'>
                {props.addButton.title}
              </span>
            </LinkButton>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
