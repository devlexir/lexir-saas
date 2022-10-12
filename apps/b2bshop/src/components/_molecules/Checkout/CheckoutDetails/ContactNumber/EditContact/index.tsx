import Button from '@components/ui/button';
import Input from '@components/ui/form/input';
import SelectInput from '@components/ui/form/select-input';
import Text from '@components/ui/text';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface ContactFormValues {
  first_name: string;
  last_name: string;
  ddi: any;
  number: string;
}

const EditContact: React.FC = ({ contactToEdit, setIsEdit }: any) => {
  const [ddiOption, setDdiOption] = useState([
    { label: '(PT) +351', value: '+351' },
  ]);

  const ddiList: object[] = [{ label: '(PT) +351', value: '+351' }];

  const changeDdiFunction = (variationName: any) => {
    setDdiOption(
      //@ts-ignore
      ddiList.filter((option: any) => option.value === variationName.value)
    );
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    defaultValues: {
      first_name: contactToEdit.first_name,
      last_name: contactToEdit.last_name,
      ddi: contactToEdit.ddi,
      number: contactToEdit.number,
    },
  });

  function onSubmit(values: ContactFormValues, e: any) {}

  function handleCancel() {
    setIsEdit(false);
  }

  return (
    <div className='-mt-4 flex h-full flex-col justify-between text-15px md:mt-0'>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className='mb-6 flex w-full  flex-row gap-4'>
          <Input
            variant='solid'
            {...register('first_name', { required: 'Company name Required' })}
            placeholder='First Name'
            error={errors.first_name?.message}
            className='grow'
          />
          <Input
            variant='solid'
            {...register('last_name', { required: 'Address is Required' })}
            placeholder='Last Name'
            error={errors.last_name?.message}
            className='grow'
          />
        </div>
        <div className='mb-6 grid grid-cols-3 gap-4'>
          <SelectInput
            {...register('ddi')}
            control={control}
            placeholder='Select a option'
            value={ddiOption}
            options={ddiList}
            onChange={changeDdiFunction}
          />
          <Input
            variant='solid'
            {...register('number', {
              required: 'City is Required',
            })}
            placeholder='Contact Number'
            error={errors.number?.message}
            className='col-span-2'
          />
        </div>
        <div className='h w-full bg-[#F5E4B6] py-1 px-5'>
          <Text>
            {
              'Please make sure to leave the contact info of the person receiving the order, they will be contacted if there are any issues upon delivery'
            }
          </Text>
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

export default EditContact;
