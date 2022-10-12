import { FormProvider, useForm } from 'react-hook-form';

import { useTranslation } from 'next-i18next';

import { Card } from '@components/common/card';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import Input from '@components/ui/input';

import { useCreateUserMutation } from '@data/user/use-user-create.mutation';
import { yupResolver } from '@hookform/resolvers/yup';

import UserTypeInput from './components/user-type-input';

import { customerValidationSchema } from './user-validation-schema';

type FormValues = {
  name: string;
  email: string;
  phone: string;
  city: string;
  account_type: string;
};

const defaultValues = {
  email: '',
  name: '',
  phone: '',
  city: '',
  account_type: '',
};

const CustomerCreateForm = () => {
  const { t } = useTranslation();

  const { mutate: registerUser, isLoading: loading } = useCreateUserMutation();

  const methods = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(customerValidationSchema),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = methods;

  async function onSubmit({
    name,
    email,
    phone,
    city,
    account_type,
  }: FormValues) {
    registerUser(
      {
        variables: {
          name,
          email,
          phone,
          city,
          account_type,
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
        <div className='flex flex-wrap pb-2 my-5 sm:my-8'>
          <Description
            title='Account'
            details='Choose between B2B or B2C'
            className='w-full px-0 pb-5 sm:pr-4 md:pr-5 sm:w-4/12 md:w-1/3 sm:py-8'
          />
          <UserTypeInput />
        </div>

        <div className='flex flex-wrap my-5 sm:my-8'>
          <Description
            title='Basic Info'
            details='Customer basic informations'
            className='w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8'
          />

          <div className='w-full sm:w-8/12 md:w-2/3'>
            <Card className='border'>
              <Input
                label='Name*'
                {...register('name')}
                type='text'
                variant='outline'
                className='mb-4 h-48 pt-8'
                error={t(errors.name?.message!)}
                note='Full name of the customer.'
              />

              <Input
                label='E-mail*'
                {...register('email')}
                type='email'
                variant='outline'
                className='mb-4 h-48 pt-8'
                error={t(errors.email?.message!)}
                note='Put the main e-mail of customer.'
              />

              <Input
                label='Phone*'
                {...register('phone')}
                error={t(errors.phone?.message!)}
                variant='outline'
                className='mb-4 h-48 pt-8'
                note='Commercial phone starting with +00'
              />

              <Input
                label='City*'
                {...register('city')}
                error={t(errors.city?.message!)}
                variant='outline'
                className='mb-4 h-48 pt-8'
                note='City that customer is located.'
              />
            </Card>
          </div>
        </div>

        <div className='mb-4 text-end flex justify-end gap-8'>
          <Button loading={loading} variant='outline'>
            Cancel
          </Button>

          <Button loading={loading} disabled={loading}>
            Add New
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default CustomerCreateForm;
