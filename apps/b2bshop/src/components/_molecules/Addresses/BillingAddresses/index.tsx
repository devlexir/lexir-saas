import AddNewBillingAddress from '@components/_molecules/Addresses/BillingAddresses/AddNewBillingAddress';
import EditBillingAddress from '@components/_molecules/Addresses/BillingAddresses/EditBillingAddress';
import Button from '@components/ui/button';
import cn from 'classnames';
import { useState } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';

const AddressOption = ({
  selectedBillingAddress,
  setSelectedBillingAddress,
  address,
  setIsEdit,
  setAddressToEdit,
}: any) => {
  return (
    <div className='flex h-36 w-full  flex-row'>
      <div
        className={cn(
          'w-full bg-light flex grow flex-row items-center justify-between rounded border px-5',
          selectedBillingAddress === address.address_nickname
            ? 'border-brand shadow-card'
            : 'border-fill-two'
        )}
      >
        <label className='text-base text-brand-dark md:text-xl w-full'>
          <div className='flex flex-col'>
            <div className='flex flex-row w-full justify-between'>
              <div>
                <span className='font-bold'>{address.address_nickname}</span>
              </div>
            </div>
            <div className=''>
              <span className='text-sm'>{address.address_companyname}</span>
            </div>
            <div className=''>
              <span className='text-sm'>{address.address_1}</span>
            </div>
            <div className='mt-2 text-brand font-medium'>
              <Button
                variant='tertiary'
                className='mr-1'
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                  setIsEdit(true);
                  setAddressToEdit(address);
                }}
              >
                Edit
              </Button>

              <span className='text-xs'>|</span>
              <Button
                variant='tertiary'
                className='mx-1'
                onClick={(e: React.MouseEvent<HTMLElement>) => {}}
              >
                Delete
              </Button>
              {!address.primary ? (
                <>
                  <span className='text-xs'>|</span>
                  <Button
                    variant='tertiary'
                    className='mx-1'
                    onClick={(e: React.MouseEvent<HTMLElement>) => {}}
                  >
                    Set as default
                  </Button>{' '}
                </>
              ) : null}
            </div>
          </div>
        </label>

        <input
          type='radio'
          value={address.address_nickname}
          checked={
            selectedBillingAddress === address.address_nickname ? true : false
          }
          className={cn(
            'w-3 h-3 bg-light items-center justify-between rounded border p-3',
            selectedBillingAddress === address.address_nickname
              ? 'text-brand'
              : 'border-gray-300'
          )}
          onChange={(event: React.FormEvent<HTMLElement>) => {
            setSelectedBillingAddress((event.target as HTMLInputElement).value);
          }}
        />
      </div>
    </div>
  );
};

const AddNewAddressOption = ({ setIsAdd }: any) => {
  return (
    <div
      className='flex h-36 w-full cursor-pointer flex-row'
      onClick={(event: React.FormEvent<HTMLElement>) => {
        setIsAdd(true);
      }}
    >
      <div className='w-full bg-light flex grow flex-row items-center justify-between rounded border px-5'>
        <label className='text-base text-brand-dark md:text-xl w-full'>
          <div className='flex flex-row cursor-pointer'>
            <div className='flex flex-row w-full justify-between'>
              <div>
                <span className='font-medium'>Add new address</span>
              </div>
            </div>
            <div className=''>
              <AiOutlinePlus size={19} />
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

const BillingAddresses = ({
  addresses,
  selectedBillingAddress,
  setSelectedBillingAddress,
}: any) => {
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [addressToEdit, setAddressToEdit] = useState({});
  const { register } = useForm({
    defaultValues: {
      contact_option: '',
    },
  });

  return (
    <>
      {isEdit ? (
        <EditBillingAddress
          setIsEdit={setIsEdit}
          addressToEdit={addressToEdit}
          setAddressToEdit={setAddressToEdit}
        />
      ) : isAdd ? (
        <AddNewBillingAddress setIsAdd={setIsAdd} />
      ) : (
        <div className='grid grid-cols-2 gap-2'>
          {addresses?.map((address: any, index: any) => {
            return (
              <AddressOption
                selectedBillingAddress={selectedBillingAddress}
                setSelectedBillingAddress={setSelectedBillingAddress}
                address={address}
                value={address.address_nickname}
                register={register}
                setIsEdit={setIsEdit}
                setAddressToEdit={setAddressToEdit}
              />
            );
          })}
          <AddNewAddressOption setIsAdd={setIsAdd} />
        </div>
      )}
    </>
  );
};

export default BillingAddresses;
