import { FormProvider, useForm } from 'react-hook-form';

import { useRouter } from 'next/router';

import { Card } from '@components/common/card';
import FormHeader from '@components/form/form-header';
import Description from '@components/ui/description';
import Input from '@components/ui/input';

import { useUpdateBillingAddressMutation } from '@data/customer/address/use-customer-billing-address.mutation';
import { yupResolver } from '@hookform/resolvers/yup';

import { customerValidationSchema } from './user-validation-schema';

type FormValues = {
  id?: any;
  subdomain?: any;
  billing_name?: string;
  billing_address_nickname?: string;
  billing_address?: string;
  billing_address2?: string;
  billing_city?: string;
  billing_country?: any;
  billing_zip?: string;
};

let defaultValues = {
  id: null,
  subdomain: 'lexir',
  billing_name: '',
  billing_address_nickname: '',
  billing_address: '',
  billing_address2: '',
  billing_city: '',
  billing_country: '',
  billing_zip: '',
};

const UpdateCustomerBillingAddressForm = (props: any) => {
  defaultValues = props.initialValues;
  const { query } = useRouter();
  const router = useRouter();

  const { mutate: updateCustomerBillingAddress, isLoading: loading } =
    useUpdateBillingAddressMutation();

  const methods = useForm<FormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(customerValidationSchema),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = methods;

  async function onSubmit({
    billing_name,
    billing_address_nickname,
    billing_address,
    billing_address2,
    billing_city,
    billing_country,
    billing_zip,
  }: FormValues) {
    updateCustomerBillingAddress(
      {
        variables: {
          id: query.customerId as string,
          billingId: defaultValues.id,
          input: {
            billing_name,
            billing_address_nickname,
            billing_address,
            billing_address2,
            billing_city,
            billing_country,
            billing_zip,
          },
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
          title={'Edit  Address'}
          subTitle={'Manage your account addresses'}
          onClick={router.back}
          loading={loading}
          cancelButtonTitle={'Cancel'}
          addButtonTitle={'Edit'}
        />

        {/* Billing Info */}
        <div className='my-5 flex flex-wrap sm:my-8 lg:mt-[160px] lg:px-4'>
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
            </Card>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default UpdateCustomerBillingAddressForm;
