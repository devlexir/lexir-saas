import { Switch } from '@headlessui/react';
import { useTranslation } from 'next-i18next';
import { Control, Controller, FieldErrors } from 'react-hook-form';

import ValidationError from './form-validation-error';

interface Props {
  control: Control<any>;
  errors?: FieldErrors;
  label?: string;
  name: string;
  [key: string]: unknown;
}

const SwitchInput = ({ control, label, name, errors, ...rest }: Props) => {
  const { t } = useTranslation();
  return (
    <div>
      {label && <div>{label}</div>}
      <Controller
        name={name}
        control={control}
        {...rest}
        render={({ field: { onChange, value } }) => (
          <Switch
            checked={value}
            onChange={onChange}
            className={`${
              value ? 'bg-accent' : 'bg-gray-300'
            } relative inline-flex h-12 w-20 items-center rounded-full focus:outline-none`}
          >
            <span className='sr-only'>Enable {label}</span>
            <span
              className={`${
                value ? 'translate-x-11' : 'translate-x-1'
              } inline-block h-8 w-8 transform rounded-full bg-light transition-transform`}
            />
          </Switch>
        )}
      />
      <ValidationError message={t(errors?.[name]?.message)} />
    </div>
  );
};

export default SwitchInput;
