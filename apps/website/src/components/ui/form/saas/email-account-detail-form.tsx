import Input from '@components/ui/input';
import React from 'react';
import { useForm } from 'react-hook-form';

const EmailAccountDetailForm = () => {
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
        <Input
          type='text'
          label={'Email'}
          {...register('email')}
          variant='outline'
          className='w-full'
          error={errors.email?.message}
        />
      </form>
    </div>
  );
};

export default EmailAccountDetailForm;
