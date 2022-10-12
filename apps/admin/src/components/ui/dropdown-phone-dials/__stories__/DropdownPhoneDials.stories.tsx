// src/components/buttons/__stories__/Button.stories.tsx
import * as React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import DropdownPhoneDials from '../index';

export default {
  title: 'Components/Dropdown/Settings/PhoneDials',
  component: DropdownPhoneDials,
  argTypes: {
    children: {
      control: { type: 'text' },
    },
  },
} as ComponentMeta<typeof DropdownPhoneDials>;

const Template: ComponentStory<typeof DropdownPhoneDials> = (args) => (
  <DropdownPhoneDials {...args} />
);

export const Default = Template.bind({});

Default.args = {};
