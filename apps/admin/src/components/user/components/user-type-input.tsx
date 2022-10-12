import { useFormContext } from 'react-hook-form';

import { useTranslation } from 'next-i18next';

import { Card } from '@components/common/card';
import ValidationError from '@components/ui/form-validation-error';
import Label from '@components/ui/label';
import SelectInput from '@components/ui/select-input';

const userType = [
  { name: 'B2B', value: 'B2B' },
  { name: 'B2C', value: 'B2C' },
];

const UserTypeInput = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { t } = useTranslation();

  return (
    <Card className='w-full sm:w-8/12 md:w-2/3'>
      <div className='mb-5'>
        <Label className='block text-body-dark font-semibold text-lg sm:text-xl leading-none mb-4'>
          Account Type
        </Label>
        <SelectInput
          name='user_type'
          control={control}
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option.value}
          options={userType}
        />
        <p className='mt-4 text-xs text-body'>Stock Keeping Unit (SKU).</p>
        <ValidationError message={t(errors.user_type?.message)} />
      </div>
    </Card>
  );
};

export default UserTypeInput;
