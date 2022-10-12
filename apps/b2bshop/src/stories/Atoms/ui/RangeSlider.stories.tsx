import RangeSlider from '@components/ui/rangeSlider';
import { FilterProvider } from '@contexts/filter/filter.context';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';

export default {
  title: 'Atoms/ui/RangeSlider',
  component: RangeSlider,
} as ComponentMeta<typeof RangeSlider>;

const Template: ComponentStory<typeof RangeSlider> = () => (
  <FilterProvider>
    <RangeSlider />;
  </FilterProvider>
);

export const Default = Template.bind({});
