import Input from '@components/ui/form/input';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';

export default {
  title: 'Atoms/ui/Form/Input',
  component: Input,
  args: {
    name: 'default',
    label: 'Label',
    placeholder: 'Placeholder',
    type: 'text',
  },
  argTypes: {
    name: {
      control: false,
    },
    variant: {
      options: ['normal', 'solid', 'outline'],
      control: { type: 'radio' },
    },
    type: {
      control: false,
    },
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = ({
  name,
  label,
  placeholder,
  variant,
  type,
}) => (
  <Input
    className='block'
    label={label}
    name={name}
    error=''
    placeholder={placeholder}
    variant={variant}
    shadow
    type={type}
    inputClassName=''
    labelClassName=''
  />
);

export const Default = Template.bind({});

Default.args = {
  label: '',
  variant: 'normal',
  placeholder: 'Placeholder',
};
