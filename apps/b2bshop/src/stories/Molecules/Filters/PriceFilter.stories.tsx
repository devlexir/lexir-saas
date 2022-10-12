import { PriceFilter } from '@components/search/Filters/PriceFilter';
import { FilterProvider } from '@contexts/filter/filter.context';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Molecules/Filters/PriceFilter',
  component: PriceFilter,
  argTypes: {
    errorMessage: {
      control: 'text',
    },
    addButtonLabel: {
      control: 'text',
    },
  },
  decorators: [(Story) => Story()],
} as ComponentMeta<typeof PriceFilter>;

const Template: ComponentStory<typeof PriceFilter> = () => {
  return (
    <FilterProvider>
      <PriceFilter />
    </FilterProvider>
  );
};

export const Default = Template.bind({});

Default.args = {};
