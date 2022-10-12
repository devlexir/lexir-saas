import CheckoutOrderSummary from '@components/_organisms/Checkout/CheckoutOrderSummary';
import { ManagedUIContext } from '@contexts/ui.context';
import { faker } from '@faker-js/faker';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';

export default {
  title: 'Organisms/Checkout/CheckoutOrderSummary',
  component: CheckoutOrderSummary,
  argTypes: {
    errorMessage: {
      control: 'text',
    },
    addButtonLabel: {
      control: 'text',
    },
  },
} as ComponentMeta<typeof CheckoutOrderSummary>;

const items = [
  {
    id: 1894,
    name: 'ODVI COCKTAIL BOX',
    slug: null,
    unit: null,
    imageSRC:
      'https://cdn-lexir.s3.eu-west-3.amazonaws.com/images/product_packshoots/placeholder-bottles.png',
    size: '700',
    stock: '1000',
    price: '31.00',
    quantity: 7,
    itemTotal: 217,
  },
  {
    id: 1893,
    name: 'ODVI(1L)',
    slug: null,
    unit: null,
    imageSRC:
      'https://cdn-lexir.s3.eu-west-3.amazonaws.com/images/product_packshoots/odvi-armagnac-bottle.png',
    size: '1,000',
    stock: '1000',
    price: '31.00',
    quantity: 1,
    itemTotal: 31,
  },
  {
    id: 1892,
    name: 'ODVI',
    slug: null,
    unit: null,
    imageSRC:
      'https://cdn-lexir.s3.eu-west-3.amazonaws.com/images/product_packshoots/odvi-armagnac-bottle.png',
    size: '700',
    stock: '1000',
    price: '23.85',
    quantity: 1,
    itemTotal: 23.85,
  },
];

const Template: ComponentStory<typeof CheckoutOrderSummary> = ({}: any) => (
  <>
    <ManagedUIContext>
      <CheckoutOrderSummary items={items} total={100} isEmpty={false} />
    </ManagedUIContext>
  </>
);

export const Default = Template.bind({});

Default.args = {
  errorMessage: 'No Billing info was found',
  addButtonLabel: 'Add a new address',
};
