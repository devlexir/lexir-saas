import SelectCustom from '@components/ui/select-custom/select-custom';
import { Controller } from 'react-hook-form';

interface SelectInputProps {
  control: any;
  rules?: any;
  name: string;
  options: object[];
  [key: string]: unknown;
}

const SelectInputCustom = ({
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
  ...rest
}: SelectInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      {...rest}
      render={({ field }) => (
        <SelectCustom
          {...field}
          placeholder={placeholder}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
          isMulti={isMulti}
          isClearable={isClearable}
          isLoading={isLoading}
          options={options}
          defaultInputValue={defaultInputValue}
          defaultValue={defaultValue}
        />
      )}
    />
  );
};

export default SelectInputCustom;
