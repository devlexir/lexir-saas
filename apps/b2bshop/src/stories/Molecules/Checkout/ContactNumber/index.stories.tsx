import ContactNumber from '@components/_molecules/Checkout/CheckoutDetails/ContactNumber';
import { faker } from '@faker-js/faker';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

export default {
  title: 'Molecules/Checkout/Step3-ContactNumber',
  component: ContactNumber,
  argTypes: {
    errorMessage: {
      control: 'text',
    },
    addButtonLabel: {
      control: 'text',
    },
  },
  decorators: [(Story) => Story()],
} as ComponentMeta<typeof ContactNumber>;

const Template: ComponentStory<typeof ContactNumber> = ({}) => {
  let contacts = [
    {
      id: 1,
      first_name: 'A. ',
      last_name: 'CCC',
      number: '+351914997132',
      primary: true,
    },
    {
      id: 2,
      first_name: 'L. ',
      last_name: 'CCC',
      number: '+351914997135',
      primary: false,
    },
    {
      id: 3,
      first_name: 'P. ',
      last_name: 'CCC',
      number: '+351914997131',
      primary: false,
    },
  ];

  const [contactNumber, setContactNumber] = useState(contacts[0].number);

  return (
    <ContactNumber
      contacts={contacts}
      contactNumber={contactNumber}
      setContactNumber={setContactNumber}
    />
  );
};

export const Default = Template.bind({});
Default.args = {};
