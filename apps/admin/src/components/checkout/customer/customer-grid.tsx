import { useTranslation } from 'next-i18next';

import { useAtom } from 'jotai';

import { PlusIcon } from '@components/icons/plus-icon';
import { useModalAction } from '@components/ui/modal/modal.context';

import { customerAtom } from '@contexts/checkout';

interface CustomerProps {
  label: string;
  count?: number;
  className?: string;
}

const CustomerGrid = ({ label, count, className }: CustomerProps) => {
  const [customer] = useAtom(customerAtom);
  const { openModal } = useModalAction();
  const { t } = useTranslation('common');

  function onAddOrChange() {
    openModal('SELECT_CUSTOMER');
  }
  return (
    <div className={className}>
      <div className='flex items-center justify-between mb-5 md:mb-8'>
        <div className='flex items-center space-s-3 md:space-s-4'>
          {count && (
            <span className='flex items-center justify-center w-8 h-8 text-base rounded-full bg-accent lg:text-xl text-light'>
              {count}
            </span>
          )}
          <p className='text-lg capitalize lg:text-xl text-heading'>{label}</p>
        </div>

        <button
          className='flex items-center text-sm font-semibold transition-colors duration-200 text-accent focus:outline-none focus:text-accent-hover hover:text-accent-hover'
          onClick={onAddOrChange}
        >
          <PlusIcon className='w-4 h-4 stroke-2 me-0.5' />
          {customer?.value ? t('text-update') : t('text-add')}
        </button>
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 2xl:grid-cols-3'>
        {customer?.value ? (
          <div className='relative h-full p-4 border rounded shadow-sm cursor-pointer group hover:border-accent border-accent bg-light'>
            <p className='text-sm font-semibold capitalize text-heading'>
              {customer.label}
            </p>
          </div>
        ) : (
          <span className='relative px-5 py-6 text-base text-center bg-gray-100 border rounded border-border-200'>
            {t('text-no-customer')}
          </span>
        )}
      </div>
    </div>
  );
};

export default CustomerGrid;
