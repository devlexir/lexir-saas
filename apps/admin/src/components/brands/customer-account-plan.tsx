import { useFormContext } from 'react-hook-form';

import { useTranslation } from 'next-i18next';

import { Card } from '@components/common/card';
import ValidationError from '@components/ui/form-validation-error';
import Label from '@components/ui/label';
import SelectInput from '@components/ui/select-input';

const AccountPlan = ({ title, name, selectOptions, subText }: any) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { t } = useTranslation();

  return (
    <Card className='w-full sm:w-8/12 md:w-2/3 px-4 pt-8 pb-4 border rounded-lg'>
      <div className=''>
        <Label className='block text-[#6F6F6F] font-semibold text-lg sm:text-xl leading-none mb-4'>
          {title}
        </Label>
        <SelectInput
          name={name}
          control={control}
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option.value}
          options={selectOptions}
          placeholder='Choose a category'
          className='placeholder:text-[#CCCCCC] placeholder:text-sm placeholder:pl-4'
        />
        <p className='mt-2 text-xs text-[#CCCCCC]'>{subText}</p>
        <ValidationError message={t(errors.account_plan?.message)} />
      </div>
    </Card>
  );
};

export default AccountPlan;
