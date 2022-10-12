import Button from '@components/ui/button';
import PasswordInput from '@components/ui/form/password-input';
import Heading from '@components/ui/heading';
import {
  useChangePasswordMutation,
  ChangePasswordInputType,
} from '@framework/basic-rest/customer/use-change-password';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';

const defaultValues = {
  oldPassword: '',
  newPassword: '',
  newPasswordConfirm: '',
};

const ChangePassword: React.FC = () => {
  const { t } = useTranslation();
  const { mutate: changePassword, isLoading } = useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordInputType>({
    defaultValues,
  });
  function onSubmit(input: ChangePasswordInputType) {
    changePassword(input);
  }
  return (
    <>
      <Heading variant='titleLarge'>
        {t('common:text-account-details-password')}
      </Heading>
      <div className='mt-6 flex  h-full w-full flex-col lg:mt-7 lg:w-10/12 2xl:w-9/12'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='mx-auto flex w-full flex-col justify-center '
        >
          <div className='flex flex-col space-y-5 lg:space-y-7'>
            <PasswordInput
              label={'Old Password'}
              error={errors.oldPassword?.message}
              {...register('oldPassword', {
                required: `${'Old password is required'}`,
              })}
            />
            <PasswordInput
              label={'New Password'}
              error={errors.newPassword?.message}
              {...register('newPassword', {
                required: `${'New password is required'}`,
              })}
            />
            <PasswordInput
              label={'Confirm new password'}
              error={errors.newPasswordConfirm?.message}
              {...register('newPasswordConfirm', {
                required: `${'Confirm new password'}`,
              })}
            />

            <div className='relative mt-3'>
              <Button
                type='submit'
                loading={isLoading}
                disabled={isLoading}
                variant='formButton'
                className='w-full sm:w-auto'
              >
                {t('common:text-change-password')}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
