import AddNewContact from '@components/_molecules/Checkout/CheckoutDetails/ContactNumber/AddNewContact';
import EditContact from '@components/_molecules/Checkout/CheckoutDetails/ContactNumber/EditContact';
import Button from '@components/ui/button';
import cn from 'classnames';
import { useState } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';

const ContactOption = ({
  contactNumber,
  setContactNumber,
  register,
  value,
  contact,
  setIsEdit,
  setContactToEdit,
}: any) => {
  return (
    <div className='flex h-28 w-full  flex-row'>
      <div
        className={cn(
          'w-full bg-light flex grow flex-row items-center justify-between rounded border px-5',
          contactNumber === value
            ? 'border-brand shadow-card'
            : 'border-fill-two'
        )}
      >
        <label className='text-base text-brand-dark md:text-xl w-full'>
          <div className='flex flex-col'>
            <div className='flex flex-row w-full justify-between'>
              <div>
                <span className='font-bold'>
                  {contact.first_name} {contact.last_name}
                </span>
              </div>
            </div>
            <div className=''>
              <span className='text-sm'>{contact.number}</span>
            </div>
            <div className='mt-2 text-brand font-medium'>
              <Button
                variant='tertiary'
                className='mr-1'
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                  setIsEdit(true);
                  setContactToEdit(contact);
                }}
              >
                Edit
              </Button>

              {!contact.primary ? (
                <>
                  <span className='text-xs'>|</span>
                  <Button
                    variant='tertiary'
                    className='mx-1'
                    onClick={(e: React.MouseEvent<HTMLElement>) => {}}
                  >
                    Delete
                  </Button>
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
          {...register('contact_option', { required: true })}
          type='radio'
          value={value}
          checked={contactNumber === value ? true : false}
          className={cn(
            'w-3 h-3 bg-light items-center justify-between rounded border p-3',
            contactNumber === value ? 'text-brand' : 'border-gray-300'
          )}
          onChange={(event: React.FormEvent<HTMLElement>) => {
            setContactNumber((event.target as HTMLInputElement).value);
          }}
        />
      </div>
    </div>
  );
};

const AddNewContactOption = ({ setIsAdd }: any) => {
  return (
    <div
      className='flex h-28 w-full cursor-pointer flex-row'
      onClick={(event: React.FormEvent<HTMLElement>) => {
        setIsAdd(true);
      }}
    >
      <div className='w-full bg-light flex grow flex-row items-center justify-between rounded border px-5'>
        <label className='text-base text-brand-dark md:text-xl w-full'>
          <div className='flex flex-row cursor-pointer'>
            <div className='flex flex-row w-full justify-between'>
              <div>
                <span className='font-medium'>Add new contact</span>
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

const ContactNumber = ({ contacts, contactNumber, setContactNumber }: any) => {
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [contactToEdit, setContactToEdit] = useState({});
  const { register } = useForm({
    defaultValues: {
      contact_option: '',
    },
  });

  return (
    <>
      {isEdit ? (
        <EditContact
          setIsEdit={setIsEdit}
          contactToEdit={contactToEdit}
          setContactToEdit={setContactToEdit}
        />
      ) : isAdd ? (
        <AddNewContact setIsAdd={setIsAdd} />
      ) : (
        <div className='grid grid-cols-2 gap-2'>
          {contacts?.map((contact: any, index: any) => {
            return (
              <ContactOption
                contactNumber={contactNumber}
                setContactNumber={setContactNumber}
                contact={contact}
                value={contact.number}
                register={register}
                setIsEdit={setIsEdit}
                setContactToEdit={setContactToEdit}
              />
            );
          })}
          <AddNewContactOption setIsAdd={setIsAdd} />
        </div>
      )}
    </>
  );
};

export default ContactNumber;
