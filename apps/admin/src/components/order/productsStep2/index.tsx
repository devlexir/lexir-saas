import { FormProvider, useForm } from 'react-hook-form';

import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import { Card } from '@components/common/card';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import Input from '@components/ui/input';

import { useCreateCustomerMutation } from '@data/customer/use-customer-create.mutation';
import { yupResolver } from '@hookform/resolvers/yup';

import CustomerAccountName from '../components/customer-account-name';
import { customerValidationSchema } from '../order-validation-schema';

type FormValues = {
  subdomain?: any;
  name: string;
  email: string;
  phone_number: string;
  city: string;
  account_type: string;
  shipping_name: string;
  shipping_phone: string;
  shipping_email: string;
  shipping_address: string;
  shipping_city: string;
  shipping_country: string;
  shipping_state: string;
  shipping_zip: string;
  shipping_address2: string;
  billing_name: string;
  billing_phone: string;
  billing_email: string;
  billing_address: string;
  billing_address2: string;
  billing_city: string;
  billing_country: string;
  billing_state: string;
  billing_zip: string;
};

const defaultValues = {
  subdomain: 'lexir',
  contact_name: '',
  name: '',
  contact_phone: '',
  contact_city: '',
  account_type: '',
  contact_email: '',
  shipping_name: '',
  shipping_phone: '',
  shipping_email: '',
  shipping_address: '',
  shipping_city: '',
  shipping_country: '',
  shipping_state: '',
  shipping_zip: '',
  shipping_address2: '',
  billing_name: '',
  billing_phone: '',
  billing_email: '',
  billing_address: '',
  billing_address2: '',
  billing_city: '',
  billing_country: '',
  billing_state: '',
  billing_zip: '',
};

export const ProductsStep2 = (props: any, { setStep }: any) => {
  const router = useRouter();

  const { t } = useTranslation();

  const { mutate: createUser, isLoading: loading } =
    useCreateCustomerMutation();

  const methods = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(customerValidationSchema),
  });

  const handleClickStep3 = () => {
    setStep(3);
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = methods;

  const subdomain = props.subdomain;

  async function onSubmit({
    name,
    email,
    phone_number,
    city,
    account_type,
  }: FormValues) {
    createUser(
      {
        variables: {
          subdomain,
          name,
          email,
          phone_number,
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
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-wrap my-5 sm:my-8'>
            <Description
              title='Customer'
              details='Select a customer'
              className='w-full px-0 pb-5 sm:pr-4 md:pr-5 sm:w-4/12 md:w-1/3 sm:py-8'
            />
            <CustomerAccountName />
          </div>

          {/* Basic Info */}
          <div className='flex flex-wrap my-5 sm:my-8'>
            <Description
              title='Basic Info'
              details='Customer basic informations'
              className='w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8'
            />
            <div className='w-full sm:w-8/12 md:w-2/3'>
              <Card className='border rounded-lg divide-y '>
                <Input
                  label='Contact Name*'
                  {...register('name')}
                  type='text'
                  variant='outline'
                  className='mb-4 px-4 pt-8'
                  error={t(errors.name?.message!)}
                  note='Full name of the customer.'
                  placeholder='Type the customer name'
                />

                <Input
                  label='City*'
                  {...register('city')}
                  error={t(errors.city?.message!)}
                  variant='outline'
                  className='mb-4 px-4 pt-8'
                  note='City that customer is located.'
                  placeholder='customer@lexir.com'
                />

                <Input
                  label='Phone*'
                  {...register('phone_number')}
                  error={t(errors.phone_number?.message!)}
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
                  error={t(errors.email?.message!)}
                  note='Put the main e-mail of customer.'
                  placeholder='Ex: Lisboa, PT'
                />
              </Card>
            </div>
          </div>

          {/* Shipping Info */}
          <div className='flex flex-wrap my-5 sm:my-8'>
            <Description
              title='Shipping Info'
              details='Customer basic informations'
              className='w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8'
            />
            <div className='w-full sm:w-8/12 md:w-2/3'>
              <Card className='border rounded-lg divide-y '>
                <Input
                  label='Name*'
                  {...register('shipping_name')}
                  type='text'
                  variant='outline'
                  className='mb-4 px-4 pt-8'
                  error={t(errors.shipping_name?.message!)}
                  note='Ex: San Francisco St., 27'
                  placeholder='Ex: Company’s Name, Branch 3, etc.'
                />

                <Input
                  label='Phone*'
                  {...register('shipping_phone')}
                  error={t(errors.shipping_phone?.message!)}
                  variant='outline'
                  className='mb-4 px-4 pt-8'
                  note='Ex: 3rd Floor.'
                  placeholder='Address 1'
                />

                <Input
                  label='E-mail*'
                  {...register('shipping_email')}
                  error={t(errors.shipping_email?.message!)}
                  variant='outline'
                  className='mb-4 px-4 pt-8'
                  note='Ex: 3rd Floor.'
                  placeholder='Address 1'
                />

                <Input
                  label='Address 1*'
                  {...register('shipping_address')}
                  error={t(errors.shipping_address?.message!)}
                  variant='outline'
                  className='mb-4 px-4 pt-8'
                  note='Ex: 3rd Floor.'
                  placeholder='Address 1'
                />

                <Input
                  label='Address 2 (opcional)'
                  {...register('shipping_address2')}
                  variant='outline'
                  className='mb-4 px-4 pt-8'
                  error={t(errors.shipping_address2?.message!)}
                  note='Subtext Here'
                  placeholder='Secod line of addres'
                />

                <Input
                  label='City*'
                  {...register('shipping_city')}
                  error={t(errors.shipping_city?.message!)}
                  variant='outline'
                  className='mb-4 px-4 pt-8'
                  note='Inform a city for Shipping'
                  placeholder='Inform a City'
                />

                <Input
                  label='Country*'
                  {...register('shipping_country')}
                  variant='outline'
                  className='mb-4 px-4 pt-8'
                  error={t(errors.shipping_country?.message!)}
                  note='Subtext Here'
                  placeholder='Ex: Lisboa, PT'
                />

                <Input
                  label='State/ Province*'
                  {...register('shipping_state')}
                  variant='outline'
                  className='mb-4 px-4 pt-8'
                  error={t(errors.shipping_state?.message!)}
                  note='Subtext Here'
                  placeholder='Ex: Lisboa, PT'
                />

                <Input
                  label='Zip/ Postal Code*'
                  {...register('shipping_zip')}
                  variant='outline'
                  className='mb-4 px-4 pt-8'
                  error={t(errors.shipping_zip?.message!)}
                  note='Subtext Here'
                  placeholder='00000'
                />
              </Card>
            </div>
          </div>

          {/* Billing Info */}
          <div className='flex flex-wrap my-5 sm:my-8'>
            <Description
              title='Billing Info'
              details='Customer basic informations'
              className='w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8'
            />
            <div className='w-full sm:w-8/12 md:w-2/3'>
              <Card className='border rounded-lg divide-y '>
                <Input
                  label='Name*'
                  {...register('billing_name')}
                  type='text'
                  variant='outline'
                  className='mb-4 px-4 pt-8'
                  error={t(errors.billing_name?.message!)}
                  note='Ex: San Francisco St., 27'
                  placeholder='Ex: Company’s Name, Branch 3, etc.'
                />

                <Input
                  label='Phone*'
                  {...register('billing_phone')}
                  error={t(errors.billing_phone?.message!)}
                  variant='outline'
                  className='mb-4 px-4 pt-8'
                  note='Ex: 3rd Floor.'
                  placeholder='Address 1'
                />

                <Input
                  label='E-mail*'
                  {...register('billing_email')}
                  error={t(errors.billing_email?.message!)}
                  variant='outline'
                  className='mb-4 px-4 pt-8'
                  note='Ex: 3rd Floor.'
                  placeholder='Address 1'
                />

                <Input
                  label='Address 1*'
                  {...register('billing_address')}
                  variant='outline'
                  className='mb-4 px-4 pt-8'
                  error={t(errors.billing_address?.message!)}
                  note='Subtext Here'
                  placeholder='Secod line of addres'
                />

                <Input
                  label='Address 2 (opcional)'
                  {...register('billing_address2')}
                  variant='outline'
                  className='mb-4 px-4 pt-8'
                  error={t(errors.billing_address2?.message!)}
                  note='Subtext Here'
                  placeholder='Secod line of addres'
                />

                <Input
                  label='City*'
                  {...register('billing_city')}
                  error={t(errors.billing_city?.message!)}
                  variant='outline'
                  className='mb-4 px-4 pt-8'
                  note='Inform a city for Shipping'
                  placeholder='Inform a City'
                />

                <Input
                  label='Country*'
                  {...register('billing_country')}
                  variant='outline'
                  className='mb-4 px-4 pt-8'
                  error={t(errors.billing_country?.message!)}
                  note='Subtext Here'
                  placeholder='Ex: Lisboa, PT'
                />

                <Input
                  label='State/ Province*'
                  {...register('billing_state')}
                  variant='outline'
                  className='mb-4 px-4 pt-8'
                  error={t(errors.billing_state?.message!)}
                  note='Subtext Here'
                  placeholder='Ex: Lisboa, PT'
                />

                <Input
                  label='Zip/ Postal Code*'
                  {...register('billing_zip')}
                  variant='outline'
                  className='mb-4 px-4 pt-8'
                  error={t(errors.billing_zip?.message!)}
                  note='Subtext Here'
                  placeholder='00000'
                />
              </Card>
            </div>
          </div>

          <div className='flex justify-end'>
            <div>
              <Button
                variant='custom'
                onClick={router.back}
                className='me-4 uppercase text-sm'
                type='button'
              >
                Previous
              </Button>
              <Button variant='outline' className='me-4'>
                Cancel
              </Button>
              <Button
                variant='normal'
                type='button'
                onClick={handleClickStep3}
                className='uppercase'
              >
                go to payments
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
};
