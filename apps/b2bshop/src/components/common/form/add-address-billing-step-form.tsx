import { useModalState } from '@components/common/modal/modal.context';
import { useModalAction } from '@components/common/modal/modal.context';
import Button from '@components/ui/button';
import CloseButton from '@components/ui/close-button';
import { CheckBox } from '@components/ui/form/checkbox';
import { FormCheckBox } from '@components/ui/form/form-checkbox';
import Input from '@components/ui/form/input';
import SelectInput from '@components/ui/form/select-input';
import TextArea from '@components/ui/form/text-area';
import Heading from '@components/ui/heading';
import Map from '@components/ui/map';
import { isEditAtom } from '@contexts/checkout';
import { useAtom } from 'jotai';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface ContactFormValues {
  company_name: string;
  address_name: string;
  address_1: string;
  address_2?: string;
  country: any;
  city: string;
  zip_code: string;
  same_shipping_address?: any;
}

const AddAddressBillingStepForm: React.FC = ({ state, setState }) => {
  const { t } = useTranslation();
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
  // const { data: countries } = useCountriesQuery({ subdomain: subdomain });

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
        <label className='group flex cursor-pointer items-center py-2 pb-5 text-sm text-brand-dark transition-all first:pt-0 last:border-b-0 last:pb-0 hover:text-opacity-80 md:text-15px'>
          <input
            type='checkbox'
            className='form-checkbox h-[22px] w-[22px] cursor-pointer border-2 border-border-four text-brand transition duration-500 ease-in-out checked:bg-brand hover:border-brand hover:checked:bg-brand focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none'
            {...register('same_shipping_address')}
          />
          <span className='ml-2 overflow-auto text-base '>
            {'Same as shipping address'}
          </span>
        </label>

        <div className='mb-6 grid grid-cols-1 gap-5'>
          <Input
            variant='solid'
            {...register('address_name', { required: 'Addredd name Required' })}
            placeholder='Name your address, e.g. "Cafe Express" or "Office'
            error={errors.address_name?.message}
          />
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

export default AddAddressBillingStepForm;
