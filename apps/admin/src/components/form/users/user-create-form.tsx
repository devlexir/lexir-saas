import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useRouter } from 'next/router';

import { Card } from '@components/common/card';
import FormHeader from '@components/form/form-header';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import SelectInputCreate from '@components/ui/select-input-create';

import { useProductBrandsQuery } from '@data/useQueries/use-brands-product.query';
import { useCreateUserMutation } from '@data/users/use-user-create.mutation';

type FormValues = {
  brand: any;
  username?: string;
  email?: string;
  password?: string;
  confirm_password?: string;
};

const defaultValues = {
  brand: '',
  username: '',
  email: '',
  password: '',
  confirm_password: '',
};

type BrandType = {
  brand_name: string;
};

const CreateUserForm = () => {
  const router = useRouter();

  const { mutate: createUser, isLoading: loading } = useCreateUserMutation();

  const methods = useForm<FormValues>({
    defaultValues,
  });

  const brandListMap: object[] = [];

  const { data: brands } = useProductBrandsQuery({
    subdomain: 'admin',
  });

  brands &&
    brands?.brands?.data.map((data: BrandType) => {
      if (!brandListMap.some((list: any) => list?.name === data.brand_name)) {
        brandListMap.push({ name: data.brand_name, value: data.brand_name });
      }
    });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    setError,
    watch,
    formState: { isSubmitted, dirtyFields, errors },
  } = methods;

  // To disable a submit button and enable only if all fields are filled
  useEffect(() => {
    if (!isSubmitted) {
      Object.entries(dirtyFields).length >=
      Object.entries(defaultValues).length - 1
        ? setButtonDisabled(false)
        : setButtonDisabled(true);
    }
  }, [
    watch('brand'),
    watch('username'),
    watch('email'),
    watch('password'),
    watch('confirm_password'),
  ]);

  async function onSubmit({
    brand,
    username,
    email,
    password,
    confirm_password,
  }: FormValues) {
    brand = brand.value;
    createUser(
      {
        variables: {
          brand,
          username,
          email,
          password,
          confirm_password,
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
          title={'User'}
          subTitle={'Add new User'}
          onClick={router.back}
          loading={loading}
          buttonDisabled={buttonDisabled}
          cancelButtonTitle={'Cancel'}
          addButtonTitle={'Add New'}
        />

        {/* Brand Info */}
        <div className='my-5 flex flex-wrap sm:my-8 lg:mt-[160px] lg:px-4'>
          <Description
            title='User Info'
            details='User basic informations'
            className='w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5'
          />
          <div className='w-full sm:w-8/12 md:w-2/3'>
            <Card className='divide-y rounded-lg border '>
              <div className='mb-6 px-4 pt-8'>
                <Label className='mb-4 block text-lg font-semibold leading-none text-[#6F6F6F] sm:text-xl'>
                  Brand Name*
                </Label>
                <SelectInputCreate
                  {...register('brand')}
                  control={control}
                  getOptionLabel={(option: any) => option.name}
                  getOptionValue={(option: any) => option.value}
                  placeholder='Choose a brand'
                  className='placeholder:pl-4 placeholder:text-sm placeholder:text-[#CCCCCC]'
                  options={brandListMap}
                />
                <p className='mt-2 text-xs text-[#CCCCCC]'>
                  Full name of the brand.
                </p>
              </div>

              <Input
                label='User Name*'
                {...register('username')}
                type='text'
                variant='outline'
                className='mb-4 px-4 pt-8'
                error={errors.username?.message!}
                note='User Name.'
                placeholder='Type the User Name'
              />
              <Input
                label='Email*'
                {...register('email')}
                type='email'
                variant='outline'
                className='mb-4 px-4 pt-8'
                error={errors.email?.message!}
                note='Email of the user.'
                placeholder='Type the brand name'
              />
              <Input
                label='Password*'
                {...register('password')}
                type='password'
                variant='outline'
                className='mb-4 px-4 pt-8'
                error={errors.password?.message!}
                note='Type the password'
                placeholder='********'
              />
              <Input
                label='Confirm password*'
                {...register('confirm_password')}
                type='password'
                variant='outline'
                className='mb-4 px-4 pt-8'
                error={errors.confirm_password?.message!}
                note='Confirm password.'
                placeholder='********'
              />
            </Card>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateUserForm;
