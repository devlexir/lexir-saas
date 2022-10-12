import { useAtom } from 'jotai';

import Label from '@components/ui/label';

import {
  orderDateEndFilterOrderAtom,
  orderDateStartFilterOrderAtom,
} from '@contexts/filters';

export default function OrderDateFilter() {
  const [orderDateStartFilterOrder, setOrderDateStartFilterOrder] = useAtom(
    orderDateStartFilterOrderAtom
  );
  const [orderDateEndFilterOrder, setOrderDateEndFilterOrder] = useAtom(
    orderDateEndFilterOrderAtom
  );

  const handleChangeStart = (e: {
    target: { value: string | ((prev: string) => string) };
  }) => {
    setOrderDateStartFilterOrder(e.target.value);
  };

  const handleChangeEnd = (e: {
    target: { value: string | ((prev: string) => string) };
  }) => {
    setOrderDateEndFilterOrder(e.target.value);
  };

  return (
    <div className='w-full flex flex-col'>
      <Label>Order Date</Label>
      <div className='w-full flex items-center'>
        <input
          type='text'
          placeholder='Start Date'
          value={orderDateStartFilterOrder}
          onChange={handleChangeStart}
          className='w-full text-sm border border-border-base focus:border-accent rounded mr-2'
        />
        -
        <input
          type='text'
          placeholder='End Date'
          value={orderDateEndFilterOrder}
          onChange={handleChangeEnd}
          className='w-full text-sm border border-border-base focus:border-accent rounded ml-2'
        />
      </div>
    </div>
  );
}
