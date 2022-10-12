import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useRouter } from 'next/router';

import Dropzone from '@components/_common/Dropzone';
import { Card } from '@components/common';
import BillingAddress from '@components/customer/components/billing-addres';
import ShippingAddress from '@components/customer/components/shipping-addres';
import FormHeader from '@components/form/form-header';
// Design System Components
import Description from '@components/ui/description';
import ValidationError from '@components/ui/form-validation-error';
import Input from '@components/ui/input';
import InputPhoneDial from '@components/ui/input-phone-dial';
import Label from '@components/ui/label';
import SelectInput from '@components/ui/select-input';

import { getSubdomain } from '@utils/request-utils';

import { usePhoneDialQuery } from '@data/customer/phone-dial.query';
import { useUpdateCustomerMutation } from '@data/customer/use-customer-update.mutation';
import { yupResolver } from '@hookform/resolvers/yup';

import { customerValidationSchema } from './user-validation-schema';

type FormValues = {
  id?: any;
  subdomain?: any;
  first_name: string;
  email: string;
  phone_number: string;
  city: string;
  customer_type?: any;
  last_name?: any;
  account_name?: any;
  active_customer?: any;
  phone_dial?: string;
  company_number?: string;
  company_document_filename?: string;
  company_document_url?: string;
};

type InputB2BValues = {
  email: string;
  phone_number: string;
  phone_dial: string;
  city: string;
  customer_type: string;
  account_name: string;
  active_customer: string;
  company_number?: string;
  company_document_filename?: string;
  company_document_url?: string;
};

type InputB2CValues = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  phone_dial: string;
  city: string;
  customer_type: string;
  active_customer: string;
};

let defaultValues = {
  id: null,
  subdomain: 'lexir',
  email: '',
  first_name: '',
  phone_number: '',
  city: '',
  customer_type: undefined,
  last_name: '',
  account_name: '',
  active_customer: '',
  phone_dial: '',
  shippingAddress: {},
  billingAddress: {},
};

const UpdateCustomerForm = ({ initialValues }: any) => {
  const router = useRouter();
  const { subdomain: subdomain } = getSubdomain();

  defaultValues = initialValues;

  const [selectedShippingInfo, setSelectedShippingInfo] = useState();
  const [selectedBillingInfo, setSelectedBillingInfo] = useState();

  // Dropzone File
  const [dropzoneFile, setDropzoneFile] = useState([
    {
      filename: '',
      url: '',
    },
  ]);

  const [files, setFiles] = useState([]);

  const { mutate: updateCustomer, isLoading: loading } =
    useUpdateCustomerMutation();

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
    formState: { errors },
  } = methods;

  /**
   * Dropdown states
   */
  const [customerTypeOption, setCustomerTypeOption] = useState([
    { label: defaultValues.customer_type, value: defaultValues.customer_type },
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
  const phoneDialMap: object[] = [];

  const { data: result, isFetched } = usePhoneDialQuery({
    subdomain: subdomain,
  });

  /**
   * Dropdown builds
   */
  result &&
    result?.phone.data.map((data: any) => {
      if (!phoneDialMap.some((list) => list?.value === data.dial_code)) {
        phoneDialMap.push({
          label: data.code,
          value: data.dial_code,
        });
      }
    });
  useMemo(() => {
    setPhoneDial(
      //@ts-ignore
      phoneDialMap.filter((option: any) => option.dial == defaultValues?.dial)
    );
  }, [isFetched]);

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

  const changePhoneDialFunction = (e: any) => {
    setPhoneDial(
      //@ts-ignore
      phoneDial.filter((option: any) => option.value === e.value)
    );
  };

  /**
   * Reset form values after customer_type is changed
   */
  useMemo(() => reset(), [customerTypeOption]);

  //
  //
  //
  async function onSubmit({
    first_name,
    email,
    last_name,
    account_name,
    phone_number,
    phone_dial,
    city,
    customer_type,
    active_customer,
    company_number,
    company_document_filename,
    company_document_url,
  }: FormValues) {
    phone_dial = phoneDial[0]?.value;
    customer_type = customerTypeOption[0]?.value;
    active_customer = activeCustomerOption[0]?.value;

    let inputB2B: InputB2BValues = {
      email: email,
      phone_number: phone_number,
      phone_dial: phone_dial,
      city: city,
      customer_type: customer_type,
      account_name: account_name,
      active_customer: active_customer,
      company_number: company_number,
      company_document_filename: company_document_filename,
      company_document_url: company_document_url,
    };

    let inputB2C: InputB2CValues = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone_number: phone_number,
      phone_dial: phone_dial,
      city: city,
      customer_type: customer_type,
      active_customer: active_customer,
    };

    updateCustomer(
      {
        variables: {
          id: defaultValues.id,
          input: customerTypeOption[0]?.value === 'B2B' ? inputB2B : inputB2C,
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

  //
  //
  //
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormHeader
          title={'Customers'}
          subTitle={'Edit customer'}
          onClick={router.back}
          loading={loading}
          // buttonDisabled={false}
          cancelButtonTitle={'Cancel'}
          addButtonTitle={'Edit'}
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
                <>
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

                  <Input
                    label='Company Number*'
                    {...register('company_number')}
                    type='text'
                    variant='outline'
                    className='mb-4 px-4 pt-8'
                    error={errors.company_number?.message}
                    note='Last Name of the customer.'
                    placeholder='Type the customer name'
                  />
                  <Dropzone
                    label='Company Document'
                    setFiles={setFiles}
                    dropzoneFile={dropzoneFile}
                    setDropzoneFile={setDropzoneFile}
                  />
                </>
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
                placeholder='customer@lexir.com'
              />

              <InputPhoneDial
                label='Phone*'
                {...register('phone_number')}
                error={errors.phone_number?.message!}
                variant='outline'
                className=''
                note='Customer’s primary number for communications'
                placeholder='000 000 000'
                control={control}
                options={phoneDialMap}
                onChange={changePhoneDialFunction}
              />
              <Input
                label='Phone*'
                {...register('phone_number')}
                error={errors.phone_number?.message!}
                variant='outline'
                className='mb-4 px-4 pt-8'
                note='Commercial phone starting with +00'
                placeholder='(+00) 000 000 000'
              />

              <Input
                label='E-mail*'
                {...register('email')}
                type='email'
                variant='outline'
                className='mb-4 px-4 pt-8'
                error={errors.email?.message!}
                note='Put the main e-mail of customer.'
                placeholder='Ex: Lisboa, PT'
              />
            </Card>
          </div>
        </div>

        {/*
          // ==========================================================================
          // JPCARVALHO | 25-08-2022 | Solved ❌ | Tested ✅
          // Description: Shipping Address Component
          // ==========================================================================
        */}

        <div className='my-5 flex flex-wrap sm:my-8 lg:px-4'>
          <Description
            title='Shipping Info'
            details='Customer basic informations'
            className='w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5'
          />
          <ShippingAddress
            data={defaultValues?.shippingAddress}
            selected={selectedShippingInfo}
            setSelected={setSelectedShippingInfo}
            label={''}
            errorMessage='No Shipping info was found'
            addButton='Add new address'
          />
        </div>

        {/*
          // ==========================================================================
          // JPCARVALHO | 25-08-2022 | Solved ✅ | Tested ✅
          // Description: Billing Address Component
          // ==========================================================================
        */}

        <div className='my-5 flex flex-wrap sm:my-8 lg:px-4'>
          <Description
            title='Billing Info'
            details='Customer basic informations'
            className='w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5'
          />
          <BillingAddress
            selected={selectedBillingInfo}
            setSelected={setSelectedBillingInfo}
            label={''}
            data={defaultValues?.billingAddress}
            errorMessage='No Billing info was found'
            addButton='Add new address'
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default UpdateCustomerForm;
