import { ShopFilters } from '@components/search/filters';
import { FilterProvider } from '@contexts/filter/filter.context';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';

export default {
  title: 'Organisms/Filters',
  component: ShopFilters,
  argTypes: {},
} as ComponentMeta<typeof ShopFilters>;

const Template: ComponentStory<typeof ShopFilters> = () => (
  <FilterProvider>
    <ShopFilters />
  </FilterProvider>
);

export const Default = Template.bind({});
