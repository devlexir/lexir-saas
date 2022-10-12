import Button from '@components/ui/button';
import Input from '@components/ui/form/input';
import PasswordInput from '@components/ui/form/password-input';
import {
  useUpdateUserMutation,
  UpdateUserType,
} from '@framework/basic-rest/customer/use-update-customer';
import { useForm, Controller } from 'react-hook-form';

const defaultValues = {};

const AccountInformationForm = () => {
  const { mutate: updateUser, isLoading } = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserType>({
    defaultValues,
  });
  function onSubmit(input: UpdateUserType) {
    updateUser(input);
  }
  return (
    <div className='flex w-full flex-col'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='mx-auto flex w-full flex-col justify-center'
        noValidate
      >
        <div className='flex flex-col space-y-4 sm:space-y-5'>
          <Input
            type='email'
            label={'Email'}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Email is required',
              },
            })}
            variant='solid'
            className='w-full px-1.5 sm:w-1/2 md:px-2.5'
            error={errors.email?.message}
          />

          <PasswordInput
            label={'Old Password'}
            {...register('old_password', {
              required: 'Old Password is required',
            })}
            error={errors.old_password?.message}
            className='w-full px-1.5 sm:w-1/2 md:px-2.5'
          />
          <PasswordInput
            label={'New Password'}
            {...register('new_password', {
              required: 'New Password is required',
            })}
            className='w-full px-1.5 sm:w-1/2 md:px-2.5'
            error={errors.new_password?.message}
          />
          <PasswordInput
            label={'Confirm New Pasword'}
            {...register('confirm_new_password', {
              required: 'Confirm New Pasword is required',
            })}
            error={errors.confirm_new_password?.message}
            className='w-full px-1.5 sm:w-1/2 md:px-2.5'
          />
        </div>

        <div className='relative mt-5 flex pb-2 sm:ltr:ml-auto sm:rtl:mr-auto lg:pb-0'>
          <Button
            type='submit'
            loading={isLoading}
            disabled={isLoading}
            variant='formButton'
            className='w-full sm:w-auto'
          >
            {'Continue'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AccountInformationForm;
