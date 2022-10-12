import ReactCountryFlag from 'react-country-flag';
import { Controller } from 'react-hook-form';

import Select from '@components/ui/select/select';

interface SelectInputProps {
  control: any;
  rules?: any;
  name: string;
  options: object[];
  [key: string]: unknown;
}

const SelectInputPhoneDial = ({
  defaultValue,
  defaultInputValue,
  value,
  control,
  options,
  name,
  rules,
  getOptionLabel,
  getOptionValue,
  isMulti,
  isClearable,
  isLoading,
  placeholder,
  onChange,
  ...rest
}: SelectInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      {...rest}
      render={({ field }) => (
        <Select
          {...field}
          value={value}
          placeholder={placeholder}
          getOptionLabel={(option) => (
            <div className='flex gap-4'>
              <ReactCountryFlag
                countryCode={option.label}
                svg
                style={{
                  width: '24px',
                  height: '24px',
                }}
                title={option.label}
              />

              {option.value}
            </div>
          )}
          getOptionValue={getOptionValue}
          isMulti={isMulti}
          isClearable={isClearable}
          isLoading={isLoading}
          options={options}
          defaultInputValue={defaultInputValue}
          defaultValue={defaultValue}
          onChange={onChange}
        />
      )}
    />
  );
};

export default SelectInputPhoneDial;
