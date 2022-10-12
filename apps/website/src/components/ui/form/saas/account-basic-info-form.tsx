import Button from '@components/ui/button';
import Input from '@components/ui/input';
import React from 'react';
import { useForm } from 'react-hook-form';

const AccountBasicInfoForm = () => {
  // const { mutate: updateUser, isLoading } = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<any>({
    // defaultValues,
  });

  function onSubmit(input: any) {
    console.log(`Submited ${input.first_name}`);
    // dateUser(input);
  }
  return (
    <div className='flex w-full flex-col pt-10'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='mx-auto flex w-full flex-col justify-center'
        noValidate
      >
        <div className='flex pb-10 gap-10'>
          <Input
            type='text'
            label={'First Name'}
            {...register('first_name')}
            variant='outline'
            className='w-full'
            error={errors.first_name?.message}
          />
          <Input
            type='text'
            label={'Last Name'}
            {...register('last_name')}
            variant='outline'
            className='w-full'
            error={errors.last_name?.message}
          />
        </div>
        <Input
          type='text'
          label={'Company Name'}
          {...register('company_name')}
          variant='outline'
          className='w-full'
          error={errors.company_name?.message}
        />

        <div className='relative mt-10 flex pb-2 sm:ltr:ml-auto sm:rtl:mr-auto lg:pb-0'>
          <Button
            type='submit'
            // loading={isLoading}
            // disabled={isLoading}
            variant='saasPrimary'
            className='w-full sm:w-auto'
          >
            {'Update account info'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AccountBasicInfoForm;
