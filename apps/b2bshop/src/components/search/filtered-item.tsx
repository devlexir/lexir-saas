import { useFilter } from '@contexts/filter/filter.context';
import { IoClose } from 'react-icons/io5';

interface Props {
  itemKey: string;
  itemValue: string;
}

export const FilteredItem = ({ itemKey, itemValue }: Props) => {
  const { removeFilter } = useFilter();

  function handleClose() {
    removeFilter(itemValue, itemKey);
  }
  return (
    <div
      className='group flex shrink-0 m-1 items-center border border-border-base rounded-lg text-13px px-2.5 py-1.5 capitalize text-brand-dark cursor-pointer transition duration-200 ease-in-out hover:border-brand'
      onClick={handleClose}
    >
      {itemValue}
      <IoClose className='text-sm text-body ltr:ml-2 rtl:mr-2 shrink-0 ltr:-mr-0.5 rtl:-ml-0.5 mt-0.5 transition duration-200 ease-in-out group-hover:text-heading' />
    </div>
  );
};
