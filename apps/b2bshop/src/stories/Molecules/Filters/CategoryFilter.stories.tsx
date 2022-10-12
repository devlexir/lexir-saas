import { CategoryFilter } from '@components/search/Filters/CategoryFilter';
import { FilterProvider } from '@contexts/filter/filter.context';
import { faker } from '@faker-js/faker';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Molecules/Filters/CategoryFilter',
  component: CategoryFilter,
  argTypes: {
    errorMessage: {
      control: 'text',
    },
    addButtonLabel: {
      control: 'text',
    },
  },
  decorators: [(Story) => Story()],
} as ComponentMeta<typeof CategoryFilter>;

const Template: ComponentStory<typeof CategoryFilter> = ({}) => {
  const categories: any = [];

  for (let i = 0; i < 15; i++) {
    categories.push({
      id: i,
      slug: faker.unique,
      name: faker.commerce.productName(),
    });
  }

  return (
    <FilterProvider>
      <CategoryFilter categories={categories} />
    </FilterProvider>
  );
};

export const Default = Template.bind({});

Default.args = {};
