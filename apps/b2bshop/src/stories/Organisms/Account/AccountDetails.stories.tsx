import AccountDetails from '@components/my-account/account-details';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export default {
  title: 'Organisms/Account/Details',
  component: AccountDetails,
  argTypes: {},
} as ComponentMeta<typeof AccountDetails>;

const queryClientRef = new QueryClient();

const Template: ComponentStory<typeof AccountDetails> = () => (
  <QueryClientProvider client={queryClientRef}>
    <AccountDetails />
  </QueryClientProvider>
);

export const Default = Template.bind({});
