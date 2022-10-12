import { BrandsFilter } from '../../../../components/search/Filters/BrandsFilter';
import ShippingAddresses from '@components/_molecules/Addresses/ShippingAddresses';
import { faker } from '@faker-js/faker';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';
import { useState } from 'react';

export default {
  title: 'Molecules/Checkout/Step1-ShippingAddresses',
  component: ShippingAddresses,
} as ComponentMeta<typeof ShippingAddresses>;

const handleEdit: any = (id: number) => {};

const handleDelete: any = (id: number) => {};

const handleSetAsDefault: any = (id: number) => {};

const handleAdd: any = () => {};

const Template: ComponentStory<typeof ShippingAddresses> = ({}) => {
  let addresses = [
    {
      address_nickname: 'Nickname A',
      address_1: 'Street Address',
      address_2: 'sdfsdfs',
      address_country: 'Portugal',
      address_city: 'Vila do Conde',
      address_postalcode: '4485-581',
    },
    {
      address_nickname: 'Nickname B',
      address_1: 'Street Address',
      address_2: 'sdfsdf',
      address_country: 'Portugal',
      address_city: 'Vila do Conde',
      address_postalcode: '4485-581',
    },
    {
      address_nickname: 'Nickname C',
      address_1: 'Street Address',
      address_2: 'sdfsd',
      address_country: 'Portugal',
      address_city: 'Vila do Conde',
      address_postalcode: '4485-581',
    },
  ];

  const [selectedShippingAddress, setSelectedShippingAddress] = useState(
    addresses[0].address_nickname
  );

  return (
    <ShippingAddresses
      selectedShippingAddress={selectedShippingAddress}
      setSelectedShippingAddress={setSelectedShippingAddress}
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
