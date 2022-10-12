import Switch from '@components/ui/switch';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';

export default {
  title: 'Atoms/ui/Switch',
  component: Switch,
} as ComponentMeta<typeof Switch>;

const Template: ComponentStory<typeof Switch> = () => <Switch />;

export const Default = Template.bind({});
