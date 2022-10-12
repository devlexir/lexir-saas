import { FormProvider, useForm } from 'react-hook-form';

import { useRouter } from 'next/router';

import { Card } from '@components/common/card';
import FormHeader from '@components/form/form-header';
import Description from '@components/ui/description';
import Input from '@components/ui/input';

import { useCreateCustomerShippingAddressMutation } from '@data/customer/address/use-customer-shipping-address-create.mutation';
import { yupResolver } from '@hookform/resolvers/yup';

import { ShippingAddressValidationSchema } from '../validations/shipping-address-validation-schema';

type FormValues = {
  id?: string;
  address_nickname?: string;
  shipping_address?: string;
  shipping_address2?: string;
  shipping_city?: string;
  shipping_country?: string;
  shipping_zip?: string;
};

const defaultValues = {
  id: '',
  address_nickname: '',
  shipping_address: '',
  shipping_address2: '',
  shipping_city: '',
  shipping_country: '',
  shipping_zip: '',
};

const CreateCustomerShippingForm = () => {
  const router = useRouter();
  const { query } = useRouter();

  const { mutate: createCustomerShippingAddress, isLoading: loading } =
    useCreateCustomerShippingAddressMutation();

  const methods = useForm<FormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(ShippingAddressValidationSchema),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isDirty, isValid },
  } = methods;

  async function onSubmit({
    address_nickname,
    shipping_address,
    shipping_address2,
    shipping_city,
    shipping_country,
    shipping_zip,
  }: FormValues) {
    let id = query.customerId as string;
    createCustomerShippingAddress(
      {
        variables: {
          id,
          address_nickname,
          shipping_address,
          shipping_address2,
          shipping_city,
          shipping_country,
          shipping_zip,
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
          title={'Add Address'}
          subTitle={'Add new Shipping Address'}
          onClick={router.back}
          loading={loading}
          buttonDisabled={!isDirty || !isValid}
          cancelButtonTitle={'Cancel'}
          addButtonTitle={'Add New'}
        />

        {/* Shipping Info */}
        <div className='my-5 flex flex-wrap sm:my-8 lg:mt-[160px] lg:px-4'>
          <Description
            title={'Shipping Info'}
            details={'Customer basic informations'}
            className='w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5'
          />
          <div className='w-full sm:w-8/12 md:w-2/3'>
            <Card className='divide-y rounded-lg border '>
              <Input
                label={'Address Nickname*'}
                {...register('address_nickname')}
                type='text'
                variant='outline'
                className='mb-4 px-4 pt-8'
                error={errors.address_nickname?.message!}
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
      </form>
    </FormProvider>
  );
};

export default CreateCustomerShippingForm;
