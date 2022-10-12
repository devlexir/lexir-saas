import { useAtom } from 'jotai';

import Label from '@components/ui/label';

import {
  orderValueMaxFilterOrderAtom,
  orderValueMinFilterOrderAtom,
} from '@contexts/filters';

export default function OrderValueFilter() {
  const [orderValueMinFilterOrder, setOrderValueMinFilterOrder] = useAtom(
    orderValueMinFilterOrderAtom
  );
  const [orderValueMaxFilterOrder, setOrderValueMaxFilterOrder] = useAtom(
    orderValueMaxFilterOrderAtom
  );

  const handleChangeMin = (e: {
    target: { value: string | ((prev: string) => string) };
  }) => {
    setOrderValueMinFilterOrder(e.target.value);
  };

  const handleChangeMax = (e: {
    target: { value: string | ((prev: string) => string) };
  }) => {
    setOrderValueMaxFilterOrder(e.target.value);
  };

  return (
    <div className='w-full'>
      <Label>Order Value</Label>
      <div className='w-full flex items-center'>
        <input
          type='text'
          placeholder='Minimum value'
          value={orderValueMinFilterOrder}
          onChange={handleChangeMin}
          className='w-full text-sm border border-border-base focus:border-accent rounded mr-2'
        />
        -
        <input
          type='text'
          placeholder='Maximum value'
          value={orderValueMaxFilterOrder}
          onChange={handleChangeMax}
          className='w-full text-sm border border-border-base focus:border-accent rounded ml-2'
        />
      </div>
    </div>
  );
}
