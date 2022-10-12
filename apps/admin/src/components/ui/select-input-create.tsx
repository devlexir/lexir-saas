import Select from '@components/ui/select/select';
import { Controller } from 'react-hook-form';

interface SelectInputProps {
  control: any;
  rules?: any;
  name: string;
  options: object[];
  [key: string]: unknown;
}

const SelectInputCreate = ({
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
  defaultOptions,
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
          placeholder={placeholder}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
          isMulti={isMulti}
          isClearable={isClearable}
          isLoading={isLoading}
          options={options}
          defaultInputValue={defaultInputValue}
          defaultValue={defaultValue}
          defaultOptions={defaultOptions}
        />
      )}
    />
  );
};

export default SelectInputCreate;
