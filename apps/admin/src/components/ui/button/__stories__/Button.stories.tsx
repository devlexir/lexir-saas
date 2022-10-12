import * as React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import Button from '../index';

export default {
  title: 'Components/Buttons/Button',
  component: Button,
  argTypes: {
    children: {
      control: { type: 'text' },
    },
    variant: {
      control: {
        type: 'select',
        options: ['root', 'normal', 'outline', 'custom', 'customOutline'],
      },
    },
    size: { control: { type: 'select', options: ['big', 'medium', 'small'] } },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: 'Button',
  variant: 'normal',
  size: 'small',
  active: true,
  loading: false,
  disabled: false,
};
