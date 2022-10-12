import { SuggestedUseFilter } from '@components/search/Filters/SuggestedUseFilter';
import { FilterProvider } from '@contexts/filter/filter.context';
import { ComponentMeta } from '@storybook/react';

export default {
  title: 'Molecules/Filters/SuggestedUseFilter',
  component: SuggestedUseFilter,
} as ComponentMeta<typeof SuggestedUseFilter>;

export const Primary = () => (
  <FilterProvider>
    <SuggestedUseFilter />
  </FilterProvider>
);
