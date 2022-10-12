import Button from '@components/ui/button';
import Input from '@components/ui/form/input';
import { isEditAtom } from '@contexts/checkout';
import { useAtom } from 'jotai';
import { useForm } from 'react-hook-form';

interface ContactFormValues {
  first_name: string;
  last_name: string;
  ddi: any;
  first_name_contact: string;
}

const AddNewShippingAddress: React.FC = ({ setIsAdd }: any) => {
  const [isEdit, setIsEdit] = useAtom(isEditAtom);

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({});

  function onSubmit(values: ContactFormValues, e: any) {
    setIsEdit(false);
  }

  function handleCancel() {
    setIsAdd(false);
  }
  return (
    <div className='-mt-4 flex h-full flex-col justify-between text-15px md:mt-0'>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className='flex flex-col'>
          <div className=''>
            <Input
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
        </div>
      </form>
    </div>
  );
};

export default AddNewShippingAddress;
