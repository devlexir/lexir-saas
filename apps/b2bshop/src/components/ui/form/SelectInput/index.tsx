import Select from '@components/ui/select/select';

type Option = {
  value: string;
  label: string;
};

interface SelectInputProps {
  options: Option[];
  [key: string]: unknown;
}

const SelectInput = ({
  defaultValue,
  defaultInputValue,
  value,
  options,
  getOptionLabel,
  getOptionValue,
  isMulti,
  isClearable,
  isLoading,
  placeholder,
  onChange,
  isDisabled,
}: SelectInputProps) => {
  return (
    <Select
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
      isDisabled={isDisabled}
    />
  );
};

export default SelectInput;
