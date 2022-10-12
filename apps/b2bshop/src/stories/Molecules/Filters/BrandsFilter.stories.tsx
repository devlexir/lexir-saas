import { BrandsFilter } from '@components/search/Filters/BrandsFilter';
import { FilterProvider } from '@contexts/filter/filter.context';
import { faker } from '@faker-js/faker';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Molecules/Filters/BrandsFilter',
  component: BrandsFilter,
  decorators: [(Story) => Story()],
} as ComponentMeta<typeof BrandsFilter>;

const Template: ComponentStory<typeof BrandsFilter> = ({}) => {
  const brands: any = [];

  for (let i = 0; i < 15; i++) {
    brands.push({
      id: i,
      slug: faker.unique,
      name: faker.commerce.productName(),
    });
  }

  return (
    <FilterProvider>
      <BrandsFilter brands={brands} />
    </FilterProvider>
  );
};

export const Default = Template.bind({});

Default.args = {};
