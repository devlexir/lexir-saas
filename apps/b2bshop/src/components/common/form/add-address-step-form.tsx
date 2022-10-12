import { useModalState } from '@components/common/modal/modal.context';
import Button from '@components/ui/button';
import Input from '@components/ui/form/input';
import SelectInput from '@components/ui/form/select-input';
import { isEditAtom } from '@contexts/checkout';
import { useAtom } from 'jotai';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface ContactFormValues {
  company_name: string;
  address_1: string;
  address_2?: string;
  country: any;
  city: string;
  zip_code: string;
}

const AddAddressStepForm: React.FC = ({ state, setState }) => {
  const [isEdit, setIsEdit] = useAtom(isEditAtom);

  const { data } = useModalState();

  /**
   * State of selected option
   */
  const [countyOption, setCountryOption] = useState([
    { label: 'United Kingdom', value: 'United Kingdom' },
  ]);

  /**
   * List of options
   */
  const countriesList: object[] = [
    { label: 'United Kingdom', value: 'United Kingdom' },
  ];

  /**
   * Dropdown calls
   */

  /**
   * Constructor of options
   */

  /**
   * Function for change selected option
   */
  const changeVariationFunction = (variationName: any) => {
    setCountryOption(
      //@ts-ignore
      countriesList.filter(
        (option: any) => option.value === variationName.value
      )
    );
  };

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ContactFormValues>({
    defaultValues: {
      title: data || data?.title ? data?.title : '',
      default: data || data?.default ? data?.default : '',
      formatted_address:
        data || data?.address?.formatted_address
          ? data?.address?.formatted_address
          : '',
    },
  });

  function onSubmit(values: ContactFormValues, e: any) {
    setState(!state);
    setIsEdit(false);
  }

  function handleCancel() {
    setState(!state);
    setIsEdit(false);
  }
  return (
    <div className='-mt-4 flex h-full flex-col justify-between text-15px md:mt-0'>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className='mb-6 grid grid-cols-1 gap-5'>
          <Input
            variant='solid'
            {...register('company_name', { required: 'Company name Required' })}
            placeholder='Company Name (this name will appear on your invoice)'
            error={errors.company_name?.message}
          />
          <Input
            variant='solid'
            {...register('address_1', { required: 'Address is Required' })}
            placeholder='Address 1'
            error={errors.address_1?.message}
          />
          <Input
            variant='solid'
            {...register('address_2')}
            placeholder='Address 2 (optional)'
            error={errors.address_2?.message}
          />
        </div>
        <div className='mb-6 grid grid-cols-3 gap-4'>
          <SelectInput
            {...register('country')}
            control={control}
            placeholder='Select a option'
            value={countyOption}
            options={countriesList}
            onChange={changeVariationFunction}
          />
          <Input
            variant='solid'
            {...register('city', { required: 'City is Required' })}
            placeholder='City'
            error={errors.city?.message}
          />
          <Input
            variant='solid'
            {...register('zip_code', { required: 'Zip code is Required' })}
            placeholder='ZIP Code'
            error={errors.zip_code?.message}
          />
        </div>
        <div className='flex w-full justify-end gap-x-2'>
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

export default AddAddressStepForm;
