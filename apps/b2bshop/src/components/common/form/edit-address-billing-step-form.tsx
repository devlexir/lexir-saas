import { useModalState } from '@components/common/modal/modal.context';
import Button from '@components/ui/button';
import Input from '@components/ui/form/input';
import SelectInput from '@components/ui/form/select-input';
import { addNewAddressAtom, isEditAtom } from '@contexts/checkout';
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
}

const EditAddressBillingStepForm: React.FC = ({ state, setState }) => {
  const { t } = useTranslation();
  const [isEdit, setIsEdit] = useAtom(isEditAtom);
  const [addNewAddress, setAddNewAddress] = useState(addNewAddressAtom);

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
    setAddNewAddress(false);
  }
  return (
    <div className='-mt-4 flex h-full flex-col justify-between text-15px md:mt-0'>
      Same as shipping address
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
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

export default EditAddressBillingStepForm;
