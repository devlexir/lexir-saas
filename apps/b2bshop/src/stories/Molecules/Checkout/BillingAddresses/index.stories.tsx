import BillingAddresses from '@components/_molecules/Addresses/BillingAddresses';
import { faker } from '@faker-js/faker';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';
import { useState } from 'react';

export default {
  title: 'Molecules/Checkout/Step2-BillingAddresses',
  component: BillingAddresses,
} as ComponentMeta<typeof BillingAddresses>;

const handleEdit: any = (id: number) => {};

const handleDelete: any = (id: number) => {};

const handleSetAsDefault: any = (id: number) => {};

const handleAdd: any = () => {};

const Template: ComponentStory<typeof BillingAddresses> = ({}) => {
  let addresses = [
    {
      address_companyname: 'A',
      address_nickname: 'Nickname A',
      address_1: 'Street Address',
      address_2: 'sdfsdfs',
      address_country: 'Portugal',
      address_city: 'Vila do Conde',
      address_postalcode: '4485-581',
    },
    {
      address_companyname: 'B',
      address_nickname: 'Nickname B',
      address_1: 'Street Address',
      address_2: 'sdfsdf',
      address_country: 'Portugal',
      address_city: 'Vila do Conde',
      address_postalcode: '4485-581',
    },
    {
      address_companyname: 'C',
      address_nickname: 'Nickname C',
      address_1: 'Street Address',
      address_2: 'sdfsd',
      address_country: 'Portugal',
      address_city: 'Vila do Conde',
      address_postalcode: '4485-581',
    },
  ];

  const [selectedBillingAddress, setSelectedBillingAddress] = useState(
    addresses[0].address_nickname
  );

  return (
    <BillingAddresses
      selectedBillingAddress={selectedBillingAddress}
      setSelectedBillingAddress={setSelectedBillingAddress}
      addresses={addresses}
      //To handle Addresses
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      handleAdd={handleAdd}
      handleSetAsDefault={handleSetAsDefault}
    />
  );
};

export const Default = Template.bind({});

Default.args = {};
