import Button from '@components/ui/button';
import Input from '@components/ui/form/input';
import { useForm } from 'react-hook-form';

interface ShippingAddressFormValues {
  address_nickname: string;
  address_1: string;
  address_2: any;
  address_country: string;
  address_city: string;
  address_postalcode: string;
}

const EditBillingAddress: React.FC = ({ addressToEdit, setIsEdit }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingAddressFormValues>({
    defaultValues: {
      address_nickname: addressToEdit.address_nickname,
      address_1: addressToEdit.address_1,
      address_2: addressToEdit.address_2,
      address_country: addressToEdit.address_country,
      address_city: addressToEdit.address_city,
      address_postalcode: addressToEdit.address_postalcode,
    },
  });

  function onSubmit(values: ShippingAddressFormValues, e: any) {}

  function handleCancel() {
    setIsEdit(false);
  }

  return (
    <div className='-mt-4 flex h-full flex-col justify-between text-15px md:mt-0'>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className='flex flex-col'>
          <div className=''>
            <Input
              {...register('address_nickname', {
                required: 'Company name Required',
              })}
              className='block'
              name='sdfsd'
              label={'Address Nickname'}
              error=''
              placeholder={'Address Nickname'}
              variant={'outline'}
              shadow
              inputClassName=''
              labelClassName=''
            />
          </div>
          <div className='mt-3'>
            <Input
              {...register('address_1', {
                required: 'Company name Required',
              })}
              className='block'
              name='sdfsd'
              label={'Address 1'}
              error=''
              placeholder={'Address 1'}
              variant={'outline'}
              shadow
              inputClassName=''
              labelClassName=''
            />
          </div>
          <div className='mt-3'>
            <Input
              {...register('address_2', {
                required: 'Company name Required',
              })}
              className='block'
              name='sdfsd'
              label={'Address 2 (optional)'}
              error=''
              placeholder={'Address 2 (optional)'}
              variant={'outline'}
              shadow
              inputClassName=''
              labelClassName=''
            />
          </div>
          <div className='flex flex-row w-full mt-3'>
            <div className='mr-2 w-4/12'>
              <Input
                {...register('address_country', {
                  required: 'Company name Required',
                })}
                className='block'
                name='sdfsd'
                label={'Country'}
                error=''
                placeholder={'Country'}
                variant={'outline'}
                shadow
                inputClassName=''
                labelClassName=''
              />
            </div>
            <div className='mr-2 w-4/12'>
              <Input
                {...register('address_city', {
                  required: 'Company name Required',
                })}
                className='block'
                name='sdfsd'
                label={'City'}
                error=''
                placeholder={'City'}
                variant={'outline'}
                shadow
                inputClassName=''
                labelClassName=''
              />
            </div>
            <div className='w-4/12'>
              <Input
                {...register('address_postalcode', {
                  required: 'Company name Required',
                })}
                className='block'
                name='sdfsd'
                label={'Postal Code'}
                error=''
                placeholder={'Postal Code'}
                variant={'outline'}
                shadow
                inputClassName=''
                labelClassName=''
              />
            </div>
          </div>
        </div>
        <div className='mt-12 flex w-full justify-end gap-x-2'>
          <Button
            className='mt-1.5 h-11 md:h-12'
            type='button'
            variant='border'
            onClick={handleCancel}
          >
            {'Cancel'}
          </Button>
          <Button className='mt-1.5 h-11 md:h-12' type='submit'>
            {'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditBillingAddress;
