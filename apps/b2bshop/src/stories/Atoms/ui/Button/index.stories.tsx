import Button from '@components/ui/button';
import { faker } from '@faker-js/faker';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';

export default {
  title: 'Atoms/ui/Button',
  component: Button,
  argTypes: {
    errorMessage: {
      control: 'text',
    },
    addButtonLabel: {
      control: 'text',
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = ({
  variant,
  children,
  disabled = false,
  loading = false,
  type,
}) => (
  <Button type={type} variant={variant} disabled={disabled} loading={loading}>
    {children}
  </Button>
);

export const Default = Template.bind({});

Default.args = {
  children: 'ASD',
  variant: 'tertiary',
};
