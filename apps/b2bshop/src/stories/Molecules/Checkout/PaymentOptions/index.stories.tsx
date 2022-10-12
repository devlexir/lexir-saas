import PaymentOptions from '@components/_molecules/Checkout/CheckoutDetails/PaymentOptions';
import { faker } from '@faker-js/faker';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

export default {
  title: 'Molecules/Checkout/Step4-PaymentOptions',
  component: PaymentOptions,
  argTypes: {
    errorMessage: {
      control: 'text',
    },
    addButtonLabel: {
      control: 'text',
    },
  },
  decorators: [(Story) => Story()],
} as ComponentMeta<typeof PaymentOptions>;

const Template: ComponentStory<typeof PaymentOptions> = ({}) => {
  const [paymentOption, setPaymentOption] = useState('Direct Debit');
  return (
    <PaymentOptions
      paymentOption={paymentOption}
      setPaymentOption={setPaymentOption}
    />
  );
};

export const Default = Template.bind({});
Default.args = {};
