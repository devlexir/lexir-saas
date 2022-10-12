import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useRouter } from 'next/router';

import { Card } from '@components/common/card';
import InputCustomerPhoneDial from '@components/customer/Input-customer-phone-dial';
import FormHeader from '@components/form/form-header';
import CheckboxForm from '@components/ui/checkbox/checkbox-form';
import Description from '@components/ui/description';
import ValidationError from '@components/ui/form-validation-error';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import SelectInput from '@components/ui/select-input';

import { useCreateCustomerMutation } from '@data/customer/use-customer-create.mutation';
import { yupResolver } from '@hookform/resolvers/yup';

import { customerValidationSchema } from './user-validation-schema';

type FormValues = {
  subdomain?: any;
  first_name: string;
  email: string;
  phone_number: string;
  city: string;
  customer_type?: any;
  last_name?: any;
  account_name?: any;
  active_customer?: any;
  shipping_address_nickname?: string;
  shipping_address?: string;
  shipping_address2?: string;
  shipping_city?: string;
  shipping_country?: string;
  shipping_zip?: string;
  billing_name?: string;
  billing_address_checkbox?: any;
  billing_address_nickname?: string;
  billing_address?: string;
  billing_address2?: string;
  billing_city?: string;
  billing_country?: string;
  billing_zip?: string;
  phone_dial?: string;
};

const defaultValues = {
  subdomain: 'lexir',
  email: '',
  first_name: '',
  phone_number: '',
  city: '',
  customer_type: undefined,
  last_name: '',
  account_name: '',
  active_customer: '',
  shipping_address_nickname: '',
  shipping_address: '',
  shipping_address2: '',
  shipping_city: '',
  shipping_country: '',
  shipping_zip: '',
  billing_name: '',
  billing_address_checkbox: '',
  billing_address_nickname: '',
  billing_address: '',
  billing_address2: '',
  billing_city: '',
  billing_country: '',
  billing_zip: '',
  phone_dial: '',
};

const CreateCustomerForm = () => {
  const router = useRouter();
  const [sameAddress, setSameAddress] = useState(false);

  const { mutate: createCustomer, isLoading: loading } =
    useCreateCustomerMutation();

  const methods = useForm<FormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(customerValidationSchema),
  });

  const {
    control,
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isDirty, isValid },
  } = methods;

  /**
   * Dropdown states
   */
  const [customerTypeOption, setCustomerTypeOption] = useState([
    { label: 'B2C', value: 'B2C' },
  ]);
  const [activeCustomerOption, setActiveCustomerOption] = useState([
    { label: 'Inactive', value: 'inactive' },
  ]);
  const [phoneDial, setPhoneDial] = useState([
    {
      label: 'pt_PT',
      value: '+351',
    },
  ]);

  /**
   * Dropdown objects
   */
  const customerTypeList: object[] = [
    { label: 'B2B', value: 'B2B' },
    { label: 'B2C', value: 'B2C' },
  ];
  const activeCustomerList: object[] = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ];

  /**
   * Function to change the selected option of the Dropdown
   */
  const changeCustomerTypeFunction = (e: any) => {
    setCustomerTypeOption(
      //@ts-ignore
      customerTypeList.filter((option: any) => option.value === e.value)
    );
  };
  const changeActiveCustomerFunction = (e: any) => {
    setActiveCustomerOption(
      //@ts-ignore
      activeCustomerList.filter((option: any) => option.value === e.value)
    );
  };

  /**
   * Reset form values after customer_type is changed
   */
  useMemo(() => reset(), [customerTypeOption]);

  const handleOnclick = () => {
    setSameAddress(!sameAddress);
    console.log('Clicked Checkbox');
  };

  async function onSubmit({
    first_name,
    email,
    phone_number,
    phone_dial,
    city,
    customer_type,
    last_name,
    account_name,
    active_customer,
    shipping_address_nickname,
    shipping_address,
    shipping_address2,
    shipping_city,
    shipping_country,
    shipping_zip,
    billing_name,
    billing_address_checkbox,
    billing_address_nickname,
    billing_address,
    billing_address2,
    billing_city,
    billing_country,
    billing_zip,
  }: FormValues) {
    phone_dial = phoneDial[0]?.value;
    customer_type = customerTypeOption[0]?.value;
    active_customer = activeCustomerOption[0]?.value;
    if (billing_address_checkbox) {
      (billing_address_nickname = shipping_address_nickname),
        (billing_address = shipping_address),
        (billing_address2 = shipping_address2),
        (billing_city = shipping_city),
        (billing_country = shipping_country),
        (billing_zip = shipping_zip);
    }
    customerTypeOption[0]?.value === 'B2B'
      ? createCustomer(
          {
            variables: {
              email,
              phone_number,
              phone_dial,
              city,
              customer_type,
              account_name,
              active_customer,
              shipping_address_nickname,
              shipping_address,
              shipping_address2,
              shipping_city,
              shipping_country,
              shipping_zip,
              billing_name,
              billing_address_nickname,
              billing_address,
              billing_address2,
              billing_city,
              billing_country,
              billing_zip,
            },
          },
          {
            onError: (error: any) => {
              Object.keys(error?.response?.data).forEach((field: any) => {
                setError(field, {
                  type: 'manual',
                  message: error?.response?.data[field][0],
                });
              });
            },
          }
        )
      : createCustomer(
          {
            variables: {
              first_name,
              email,
              phone_number,
              phone_dial,
              city,
              customer_type,
              last_name,
              active_customer,
              shipping_address_nickname,
              shipping_address,
              shipping_address2,
              shipping_city,
              shipping_country,
              shipping_zip,
              billing_name,
              billing_address_nickname,
              billing_address,
              billing_address2,
              billing_city,
              billing_country,
              billing_zip,
            },
          },
          {
            onError: (error: any) => {
              Object.keys(error?.response?.data).forEach((field: any) => {
                setError(field, {
                  type: 'manual',
                  message: error?.response?.data[field][0],
                });
              });
            },
          }
        );
  }
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormHeader
          title={'Customers'}
          subTitle={'Add new customer'}
          onClick={router.back}
          loading={loading}
          buttonDisabled={!isDirty || !isValid}
          cancelButtonTitle={'Cancel'}
          addButtonTitle={'Add New'}
        />
        {/* Active and Inactive Dropdown */}
        <div className='my-5 flex flex-wrap sm:my-8 lg:mt-[160px] lg:px-4'>
          <Description
            title='Active or Inactive'
            details='Activete or Inactivate the Customer'
            className='w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5'
          />
          <div className='w-full sm:w-8/12 md:w-2/3'>
            <Card className='divide-y rounded-lg border '>
              <div className='mb-6 px-4 pt-8'>
                <Label className='mb-4 block text-lg font-semibold leading-none text-[#6F6F6F] sm:text-xl'>
                  Active/Inactive
                </Label>
                <SelectInput
                  {...register('active_customer')}
                  control={control}
                  options={activeCustomerList}
                  placeholder='Select a option'
                  value={activeCustomerOption}
                  onChange={changeActiveCustomerFunction}
                />
                <p className='mt-2 text-xs text-[#CCCCCC]'>Select a option</p>
                <ValidationError message={errors.active_customer?.message} />
              </div>
            </Card>
          </div>
        </div>

        {/* Account Type Dropdown */}
        <div className='my-5 flex flex-wrap sm:my-8 lg:px-4'>
          <Description
            title='Account'
            details='Choose between B2B or B2C'
            className='w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pr-4 md:w-1/3 md:pr-5'
          />
          <Card className='w-full rounded-lg border px-4 pt-8 pb-4 sm:w-8/12 md:w-2/3'>
            <div className=''>
              <Label className='mb-4 block text-lg font-semibold leading-none text-[#6F6F6F] sm:text-xl'>
                Account Type
              </Label>
              <SelectInput
                {...register('customer_type')}
                control={control}
                options={customerTypeList}
                placeholder='Choose a category'
                value={customerTypeOption}
                onChange={changeCustomerTypeFunction}
              />
              <p className='mt-2 text-xs text-[#CCCCCC]'>
                Choose between B2B or B2C
              </p>
              <ValidationError message={errors.customer_type?.message} />
            </div>
          </Card>
        </div>

        {/* Basic Info */}
        <div className='my-5 flex flex-wrap sm:my-8 lg:px-4'>
          <Description
            title='Basic Info'
            details='Customer basic informations'
            className='w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5'
          />
          <div className='w-full sm:w-8/12 md:w-2/3'>
            <Card className='divide-y rounded-lg border '>
              {customerTypeOption[0]?.value === 'B2B' ? (
                <Input
                  label='Account Name*'
                  {...register('account_name')}
                  type='text'
                  variant='outline'
                  className='mb-4 px-4 pt-8'
                  error={errors.account_name?.message}
                  note='Account Name of the customer.'
                  placeholder='Type the Account Name'
                />
              ) : (
                <>
                  <Input
                    label='First Name*'
                    {...register('first_name')}
                    type='text'
                    variant='outline'
                    className='mb-4 px-4 pt-8'
                    error={errors.first_name?.message}
                    note='First Name of the customer.'
                    placeholder='Type the customer name'
                  />

                  <Input
                    label='Last Name*'
                    {...register('last_name')}
                    type='text'
                    variant='outline'
                    className='mb-4 px-4 pt-8'
                    error={errors.last_name?.message}
                    note='Last Name of the customer.'
                    placeholder='Type the customer name'
                  />
                </>
              )}

              <Input
                label='City*'
                {...register('city')}
                error={errors.city?.message!}
                variant='outline'
                className='mb-4 px-4 pt-8'
                note='City that customer is located.'
                placeholder='Ex: Lisboa, PT'
              />

              <InputCustomerPhoneDial
                register={register}
                errors={errors}
                control={control}
                setPhoneDial={setPhoneDial}
                phoneDial={phoneDial}
                defaultValues={defaultValues}
              />

              <Input
                label='E-mail*'
                {...register('email')}
                error={errors.email?.message!}
                variant='outline'
                className='mb-4 px-4 pt-8'
                note='Put the main e-mail of customer.'
                placeholder='customer@lexir.com'
              />
            </Card>
          </div>
        </div>

        {/* Shipping Info */}
        <div className='my-5 flex flex-wrap sm:my-8 lg:px-4'>
          <Description
            title={'Shipping Info'}
            details={'Customer basic informations'}
            className='w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5'
          />
          <div className='w-full sm:w-8/12 md:w-2/3'>
            <Card className='divide-y rounded-lg border '>
              <Input
                label={'Address Nickname*'}
                {...register('shipping_address_nickname')}
                type='text'
                variant='outline'
                className='mb-4 px-4 pt-8'
                error={errors.shipping_address_nickname?.message!}
                note='A name to easily identify this address'
                placeholder='Ex. Office'
              />

              <Input
                label={'Address Line 1'}
                {...register('shipping_address')}
                error={errors.shipping_address?.message!}
                variant='outline'
                className='mb-4 px-4 pt-8'
                note='First line of the address'
                placeholder='Ex. 167 San Francisco St.'
              />

              <Input
                label={'Address Line 2 (optional)'}
                {...register('shipping_address2')}
                variant='outline'
                className='mb-4 px-4 pt-8'
                error={errors.shipping_address2?.message!}
                note='Second line of the address if necessary'
                placeholder='Ex. Building 3, Apt. 5'
              />

              <Input
                label={'City'}
                {...register('shipping_city')}
                error={errors.shipping_city?.message!}
                variant='outline'
                className='mb-4 px-4 pt-8'
                note='City of the address'
                placeholder='Ex. San Francisco'
              />

              <Input
                label={'Country*'}
                {...register('shipping_country')}
                variant='outline'
                className='mb-4 px-4 pt-8'
                error={errors.shipping_country?.message!}
                note='Country of the address'
                placeholder='Ex. USA'
              />

              <Input
                label={'Zip/ Postal Code*'}
                {...register('shipping_zip')}
                variant='outline'
                className='mb-4 px-4 pt-8'
                error={errors.shipping_zip?.message!}
                note='Zip or postal code of address'
                placeholder='00000'
              />
            </Card>
          </div>
        </div>

        {/* Billing Info */}
        <div className='my-5 flex flex-wrap sm:my-8 lg:px-4'>
          <Description
            title={'Billing Info'}
            details={'Customer basic informations'}
            className='w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5'
          />
          <div className='w-full sm:w-8/12 md:w-2/3'>
            <Card className='divide-y rounded-lg border '>
              <Input
                label={'Billing Name'}
                {...register('billing_name')}
                type='text'
                variant='outline'
                className='mb-4 px-4 pt-8'
                error={errors.billing_name?.message!}
                note='Type the company name you would like to appear on the invoice'
                placeholder='Ex. Lexir Inc.'
              />

              <CheckboxForm
                label='Billing Address'
                {...register('billing_address_checkbox')}
                handleOnclick={handleOnclick}
                className='mb-4 px-4 pt-8'
                note='Use the same shipping address'
              />
              {sameAddress ? null : (
                <>
                  <Input
                    label={'Address Nickname*'}
                    {...register('billing_address_nickname')}
                    type='text'
                    variant='outline'
                    className='mb-4 px-4 pt-8'
                    error={errors.billing_address_nickname?.message!}
                    note='A name to easily identify this address'
                    placeholder='Ex. Office'
                  />

                  <Input
                    label={'Address Line 1'}
                    {...register('billing_address')}
                    variant='outline'
                    className='mb-4 px-4 pt-8'
                    error={errors.billing_address?.message!}
                    note='First line of the address'
                    placeholder='Ex. 167 San Francisco St.'
                  />

                  <Input
                    label={'Address 2 (opcional)'}
                    {...register('billing_address2')}
                    variant='outline'
                    className='mb-4 px-4 pt-8'
                    error={errors.billing_address2?.message!}
                    note='Second line of the address if necessary'
                    placeholder='Ex. Building 3, Apt. 5'
                  />

                  <Input
                    label={'City'}
                    {...register('billing_city')}
                    error={errors.billing_city?.message!}
                    variant='outline'
                    className='mb-4 px-4 pt-8'
                    note='City of the address'
                    placeholder='Ex. San Francisco'
                  />

                  <Input
                    label={'Country*'}
                    {...register('billing_country')}
                    variant='outline'
                    className='mb-4 px-4 pt-8'
                    error={errors.billing_country?.message!}
                    note='Country of the address'
                    placeholder='Ex. USA'
                  />

                  <Input
                    label={'Zip/ Postal Code*'}
                    {...register('billing_zip')}
                    variant='outline'
                    className='mb-4 px-4 pt-8'
                    error={errors.billing_zip?.message!}
                    note='Zip or postal code of address'
                    placeholder='00000'
                  />
                </>
              )}
            </Card>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateCustomerForm;
