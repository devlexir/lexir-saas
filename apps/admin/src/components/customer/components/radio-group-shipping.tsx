import { Card } from '@components/common/card';
import { PlusVector } from '@components/icons/plus-vector';

import { RadioGroup } from '@headlessui/react';

import RadioGroupButtons from './radio-group-buttons';

interface IRadioGroupSelect {
  selected?: any;
  setSelected?: any;
  label: string;
  data: any;
  errorMessage: string;
  addButton: string;
  handleAddAddress?: any;
  handleEdit?: any;
  handleDelete: any;
  handleAdd: any;
}
const RadioGroupSelectShipping = ({
  selected,
  setSelected,
  label,
  data,
  errorMessage,
  addButton,
  handleEdit,
  handleDelete,
  handleAdd,
}: IRadioGroupSelect) => {
  return (
    <Card className='w-full rounded-lg border px-4 py-5 sm:w-8/12 md:w-2/3'>
      <div className='text-15px -mt-4 flex flex-col justify-between md:mt-0'>
        <RadioGroup
          value={selected}
          onChange={setSelected}
          className='auto-rows-auto space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0'
        >
          <RadioGroup.Label className='sr-only'>{label}</RadioGroup.Label>
          {data?.length > 0 ? (
            data?.map((item: any, index: any) => (
              <RadioGroup.Option
                key={index}
                value={item}
                className={({ checked }) =>
                  `${checked ? 'border-[#1C8C64]' : 'border-[#F2F2F2]'}
                address__box group relative block h-full min-h-[112px] cursor-pointer rounded-md border p-5 focus:outline-none`
                }
              >
                <RadioGroup.Label
                  as='h3'
                  className='mb-2 -mt-1 text-xl font-semibold text-[#6F6F6F]'
                >
                  {item?.address_nickname}
                </RadioGroup.Label>
                <RadioGroup.Description as='div' className='text-[#6F6F6F] '>
                  {item?.shipping_address}
                </RadioGroup.Description>
                <RadioGroup.Description as='div' className='text-[#6F6F6F] '>
                  {item?.shipping_address2 + item?.shipping_country}
                </RadioGroup.Description>
                <div className='mt-4'>
                  <RadioGroupButtons
                    data={item}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    shippingAddress={true}
                    billingAddress={false}
                  />
                </div>

                <div className='address__actions absolute top-3 z-10 flex transition-all ltr:right-3 rtl:left-3 '>
                  <button
                    onClick={() => ''}
                    className='text-brand-dark flex h-6 w-6 items-center justify-center rounded-full text-base text-opacity-80'
                  >
                    <span className='sr-only'>{item?.title}</span>
                  </button>
                </div>
              </RadioGroup.Option>
            ))
          ) : (
            <div className='text-brand-danger flex h-full min-h-[112px] items-center justify-start rounded border border-[#F2F2F2] p-5 font-semibold'>
              {errorMessage}
            </div>
          )}
          <button
            type='button'
            className='flex h-full min-h-[112px] w-full cursor-pointer items-center justify-between rounded border border-[#F2F2F2] p-5 text-lg font-semibold text-[#6F6F6F] transition-all hover:border-[#1C8C64]'
            onClick={() => handleAdd()}
          >
            {addButton}
            <PlusVector className='ltr:mr-2 rtl:ml-2' />
          </button>
        </RadioGroup>
      </div>
    </Card>
  );
};

export default RadioGroupSelectShipping;
