import SelectInput from '@components/ui/form/SelectInput';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';

export default {
  title: 'Atoms/ui/Form/SelectInput',
  component: SelectInput,
  args: {
    options: [
      {
        label: 'A',
        value: 'A',
      },
      {
        label: 'B',
        value: 'B',
      },
      {
        label: 'C',
        value: 'C',
      },
    ],
    placeholder: 'Placeholder',
  },
  argTypes: {},
} as ComponentMeta<typeof SelectInput>;

const Template: ComponentStory<typeof SelectInput> = ({
  options,
  placeholder,
  isMulti = true,
  isClearable = true,
  isLoading = false,
  isDisabled = false,
}) => (
  <SelectInput
    control
    name=''
    options={options}
    placeholder={placeholder}
    isMulti={isMulti}
    isClearable={isClearable}
    isLoading={isLoading}
  />
);

export const Default = Template.bind({});

Default.args = {};
