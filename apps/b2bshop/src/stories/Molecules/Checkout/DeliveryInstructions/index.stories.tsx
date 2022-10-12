import DeliveryInstructions from '@components/_molecules/Checkout/CheckoutDetails/DeliveryInstructions';
import { faker } from '@faker-js/faker';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

export default {
  title: 'Molecules/Checkout/Step5-DeliveryInstructions',
  component: DeliveryInstructions,
  argTypes: {
    errorMessage: {
      control: 'text',
    },
    addButtonLabel: {
      control: 'text',
    },
  },
  decorators: [(Story) => Story()],
} as ComponentMeta<typeof DeliveryInstructions>;

const Template: ComponentStory<typeof DeliveryInstructions> = ({}) => {
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  return (
    <DeliveryInstructions
      deliveryInstructions={deliveryInstructions}
      setDeliveryInstructions={setDeliveryInstructions}
    />
  );
};

export const Default = Template.bind({});
Default.args = {};
