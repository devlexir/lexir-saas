import { useAtom } from 'jotai';

import Label from '@components/ui/label';

import {
  availableStockMaxFilterStocksAtom,
  availableStockMinFilterStocksAtom,
} from '@contexts/filters';

export default function AvailableStockFilter() {
  const [availableStockMinFilterStocks, setAvailableStockMinFilterStocks] =
    useAtom(availableStockMinFilterStocksAtom);
  const [availableStockMaxFilterStocks, setAvailableStockMaxFilterStocks] =
    useAtom(availableStockMaxFilterStocksAtom);

  const handleChangeMin = (e: {
    target: { value: string | ((prev: string) => string) };
  }) => {
    setAvailableStockMinFilterStocks(e.target.value);
  };

  const handleChangeMax = (e: {
    target: { value: string | ((prev: string) => string) };
  }) => {
    setAvailableStockMaxFilterStocks(e.target.value);
  };

  return (
    <div className='w-full'>
      <Label>Available Stock</Label>
      <div className='w-full flex items-center'>
        <input
          type='text'
          placeholder='Minimum value'
          value={availableStockMinFilterStocks}
          onChange={handleChangeMin}
          className='w-full text-sm border border-border-base focus:border-accent rounded mr-2'
        />
        -
        <input
          type='text'
          placeholder='Maximum value'
          value={availableStockMaxFilterStocks}
          onChange={handleChangeMax}
          className='w-full text-sm border border-border-base focus:border-accent rounded ml-2'
        />
      </div>
    </div>
  );
}
