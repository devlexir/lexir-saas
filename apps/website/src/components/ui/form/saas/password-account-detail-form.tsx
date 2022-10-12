import PasswordInput from '@components/ui/password-input';
import React from 'react';
import { useForm } from 'react-hook-form';

const PasswordAccountDetailForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<any>({
    // defaultValues,
  });

  function onchange(input: any) {
    console.log(`Submited ${input.first_name}`);
    // dateUser(input);
  }
  return (
    <div className='flex w-full '>
      <form
        onSubmit={handleSubmit(onchange)}
        className='mx-auto flex w-full flex-col justify-center'
        noValidate
      >
        <PasswordInput
          type='text'
          label={'Password'}
          {...register('password')}
          variant='outline'
          className='w-full'
          error={errors.password?.message}
        />
      </form>
    </div>
  );
};

export default PasswordAccountDetailForm;
