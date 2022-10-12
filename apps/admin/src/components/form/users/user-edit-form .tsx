import { FormProvider, useForm } from 'react-hook-form';

import { useRouter } from 'next/router';

import { Card } from '@components/common/card';
import FormHeader from '@components/form/form-header';
import Description from '@components/ui/description';
import Input from '@components/ui/input';

import { useUpdateUsersMutation } from '@data/users/use-user-update.mutation';

type FormValues = {
  id?: any;
  subdomain: any;
  brand: string;
  username?: string;
  email?: string;
  password?: string;
  confirm_password?: string;
};

let defaultValues = {
  id: null,
  subdomain: 'lexir',
  brand: '',
  username: '',
  email: '',
  password: '',
  confirm_password: '',
};

const UpdateUserForm = (props: any) => {
  const router = useRouter();

  const { mutate: updateUsers, isLoading: loading } = useUpdateUsersMutation();

  defaultValues = props.initialValues;

  const methods = useForm<FormValues>({
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = methods;

  async function onSubmit({ brand, username, email }: FormValues) {
    updateUsers(
      {
        variables: {
          id: defaultValues.id,
          input: {
            ...defaultValues,
            brand,
            username,
            email,
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
          title={'Brands'}
          subTitle={'Edit Brand'}
          onClick={router.back}
          loading={loading}
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
              <Input
                label='Brand Name*'
                {...register('brand')}
                type='text'
                variant='outline'
                className='mb-4 px-4 pt-8'
                error={errors.brand?.message!}
                note='Full name of the brand.'
                placeholder='Type the brand name'
              />
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
            </Card>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default UpdateUserForm;
