// import { useEffect, useState } from 'react'
import Button from '@components/ui/button';
import Input from '@components/ui/input';
import SelectInputCustom from '@components/ui/select-input-custom';
import TextArea from '@components/ui/text-area';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';

import { useCreateLeadMutation } from '@/data/lead/use-lead-create.mutation';

import { countries } from './countries';
import { useEffect } from 'react';

type FormValues = {
  first_name: string;
  last_name: string;
  email: string;
  brand_name: string;
  brand_city: string;
  brand_country: any;
  type_of_products: string;
  which_markets?: string;
  how_about_us: any;
  anything_else_message?: string;
};

const defaultValues = {
  brand_name: '',
  brand_country: '',
  first_name: '',
  last_name: '',
  email: '',
  brand_city: '',
  type_of_products: '',
  which_markets: '',
  how_about_us: '',
  anything_else_message: '',
};
const userType = [
  { name: 'Social media', value: 'Social media' },
  { name: 'Advertisement', value: 'Advertisement' },
  { name: 'Google / Search Engine', value: 'Google / Search Engine' },
  { name: 'Word of mouth', value: 'Word of mouth' },
  {
    name: 'Spoke with a member of our team',
    value: 'Spoke with a member of our team',
  },
  { name: 'Other', value: 'Other' },
];

const GetStartedForm = (props: any) => {
  const router = useRouter();

  const { mutate: createLead, isLoading: loading } = useCreateLeadMutation();

  const methods = useForm<FormValues>({
    defaultValues,
    mode: 'onChange',
  });

  const {
    register,
    handleSubmit,
    setError,
    control,
    watch,
    reset,
    formState: {
      isSubmitted,
      dirtyFields,
      isDirty,
      isValid,
      errors,
      isSubmitSuccessful,
    },
  } = methods;

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful]);

  async function onSubmit({
    first_name,
    last_name,
    email,
    brand_name,
    brand_city,
    brand_country,
    type_of_products,
    which_markets,
    how_about_us,
    anything_else_message,
  }: FormValues) {
    how_about_us = how_about_us.value;
    brand_country = brand_country.value;
    createLead(
      {
        variables: {
          first_name,
          last_name,
          email,
          brand_name,
          brand_city,
          brand_country,
          type_of_products,
          which_markets,
          how_about_us,
          anything_else_message,
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
        {/* Brand Info */}
        <div className='flex flex-col sm:grid sm:grid-cols-2 sm:grid-rows-2 sm:flex-col'>
          <Input
            label='First Name*'
            {...register('first_name', { required: 'First Name is required' })}
            type='text'
            variant='outlineCustom'
            className=' px-4 pt-4 sm:pt-8'
            error={errors.brand_name?.message!}
            placeholder='Ex. Jane'
          />

          <Input
            label='Last Name*'
            {...register('last_name', { required: 'Last Name is required' })}
            error={errors.last_name?.message!}
            variant='outlineCustom'
            className=' px-4 pt-4 sm:pt-8'
            placeholder='Ex. Smith'
          />

          <Input
            label='Email Address*'
            {...register('email', { required: 'Email is required' })}
            error={errors.email?.message!}
            variant='outlineCustom'
            className=' px-4 pt-4 sm:pt-8'
            placeholder='Ex. janesmith@email.com'
          />

          <Input
            label='Brand Name*'
            {...register('brand_name', { required: 'Brand Name is required' })}
            error={errors.brand_name?.message}
            variant='outlineCustom'
            className=' px-4 pt-4 sm:pt-8'
            placeholder='Ex. Baldoria Vermouth'
          />
        </div>
        <Input
          label='Brand Location (City)*'
          {...register('brand_city', {
            required: 'Brand Location (City) is required',
          })}
          error={errors.brand_city?.message}
          variant='outlineCustom'
          className=' px-4 pt-4 sm:pt-8'
          placeholder='Ex. Cognac'
        />

        <div className='px-4 pt-4 sm:pt-8'>
          <label className='mb-4 block text-lg font-semibold text-[#6F6F6F] sm:text-xl'>
            Brand Location (Country)*
          </label>
          <SelectInputCustom
            {...register('brand_country', {
              required: 'Brand Location (Country) is required',
            })}
            // error={errors.brand_country?.message}
            control={control}
            getOptionLabel={(option: any) => option.name}
            getOptionValue={(option: any) => option.value}
            placeholder='Please select your country'
            className='placeholder:pl-4 placeholder:text-sm placeholder:text-[#CCCCCC]'
            options={countries}
          />
          {errors.brand_country?.message && (
            <p className='my-2 text-start text-xs text-red-500'>
              {errors.brand_country?.message}
            </p>
          )}
        </div>

        <Input
          label='What type of products do you produce?*'
          {...register('type_of_products', {
            required: 'Type of product is required',
          })}
          error={errors.type_of_products?.message!}
          variant='outlineCustom'
          className=' px-4 pt-4 sm:pt-8'
          placeholder='Ex. Gin, Whisky, Liqueur, etc.'
        />

        <Input
          label='Which countries would you like to sell your products in? (Optional)'
          {...register('which_markets')}
          error={errors.which_markets?.message!}
          variant='outlineCustom'
          className=' px-4 pt-4 sm:pt-8'
          placeholder='Ex. France, UK, Portugal, Germany, etc.'
        />

        <div className='px-4 pt-4 sm:pt-8'>
          <label className='mb-4 block text-lg font-semibold text-[#6F6F6F] sm:text-xl'>
            How did you hear about Lexir?*
          </label>
          <SelectInputCustom
            {...register('how_about_us', {
              required: '"How did you hear" field is required',
            })}
            control={control}
            getOptionLabel={(option: any) => option.name}
            getOptionValue={(option: any) => option.value}
            placeholder='Please select'
            className='placeholder:pl-4 placeholder:text-sm placeholder:text-[#CCCCCC]'
            options={userType}
          />
          {errors.how_about_us?.message && (
            <p className='my-2 text-start text-xs text-red-500'>
              {errors.how_about_us?.message}
            </p>
          )}
        </div>

        <TextArea
          label={`Anything else you'd like us to know? (Optional)`}
          {...register('anything_else_message')}
          error={errors.anything_else_message?.message!}
          variant='outlineCustom'
          className=' px-4 pt-4 sm:pt-8'
          placeholder="Anything else you'd like us to know?"
        />

        <div className='flex flex-col-reverse gap-4 px-4 pt-8 text-end sm:flex-row sm:justify-end '>
          <Button
            variant='customOutline'
            onClick={router.back}
            className='sm:me-4'
            type='button'
          >
            CANCEL
          </Button>

          <Button
            variant='custom'
            loading={loading}
            disabled={!isDirty || !isValid}
            className='rounded-md bg-[#2d2d2d] py-2 px-4 text-white hover:bg-[#3e3e3e] sm:w-64'
          >
            SUBMIT
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default GetStartedForm;
