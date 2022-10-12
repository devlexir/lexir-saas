export const selectStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    fontSize: '0.875rem',
    color: '#D9D9D9',
    cursor: 'pointer',
    borderBottom: '1px solid #E2E8F0',
    backgroundColor: state.isSelected
      ? '#E2E8F0'
      : state.isFocused
      ? '#F9FAFB'
      : '#ffffff',
  }),
  control: (_: any, state: any) => ({
    display: 'flex',
    alignItems: 'center',
    minHeight: 42,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    border: '1px solid',
    borderColor: state.isFocused ? '#1C8C64' : '#D9D9D9',
    boxShadow:
      state.menuIsOpen &&
      '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: (provided: any, state: any) => ({
    ...provided,
    color: state.isFocused ? '#2D2D2D' : '#2D2D2D',
    '&:hover': {
      color: '#9CA3AF',
    },
  }),
  clearIndicator: (provided: any, state: any) => ({
    ...provided,
    color: state.isFocused ? '#9CA3AF' : '#cccccc',
    padding: 0,
    cursor: 'pointer',

    '&:hover': {
      color: '#9CA3AF',
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    borderRadius: 5,
    border: '1px solid #F2F2F2',
    boxShadow:
      '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  }),
  valueContainer: (provided: any, _: any) => ({
    ...provided,
    paddingLeft: 15,
  }),
  singleValue: (provided: any, _: any) => ({
    ...provided,
    color: '#2D2D2D',
  }),
  multiValue: (provided: any, _: any) => ({
    ...provided,
    backgroundColor: 'rgb(var(--color-accent-400))',
    borderRadius: 9999,
    overflow: 'hidden',
    boxShadow:
      '0 0px 3px 0 rgba(0, 0, 0, 0.1), 0 0px 2px 0 rgba(0, 0, 0, 0.06)',
  }),
  multiValueLabel: (provided: any, _: any) => ({
    ...provided,

    fontSize: '0.875rem',
    color: '#ffffff',
  }),
  multiValueRemove: (provided: any, _: any) => ({
    ...provided,
    paddingLeft: 0,
    paddingRight: 8,
    color: '#ffffff',
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: 'rgb(var(--color-accent-300))',
      color: '#F3F4F6',
    },
  }),
  placeholder: (provided: any, _: any) => ({
    ...provided,
    fontSize: '0.875rem',
    color: 'rgba(204, 204, 204, 1)',
  }),
  noOptionsMessage: (provided: any, _: any) => ({
    ...provided,
    fontSize: '0.875rem',
    color: 'rgba(107, 114, 128, 0.7)',
  }),
};
