import Select from '@components/ui/select/select';
import { Controller } from 'react-hook-form';

interface SelectInputProps {
  control: any;
  rules?: any;
  name: string;
  options: object[];
  [key: string]: unknown;
}

const SelectInput = ({
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
      name={'asd'}
      rules={rules}
      {...rest}
      render={({ field }) => (
        <Select
          {...field}
          value={value}
          placeholder={placeholder}
          getOptionLabel={getOptionLabel}
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

export default SelectInput;
