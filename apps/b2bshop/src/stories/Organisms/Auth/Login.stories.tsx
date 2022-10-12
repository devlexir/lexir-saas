import Login from '@components/auth/login-form';
import ManagedModal from '@components/common/modal/managed-modal';
import { ModalProvider } from '@components/common/modal/modal.context';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export default {
  title: 'Organisms/Auth/Login',
  component: Login,
  argTypes: {},
} as ComponentMeta<typeof Login>;

const queryClientRef = new QueryClient();
const Template: ComponentStory<typeof Login> = () => (
  <>
    <QueryClientProvider client={queryClientRef}>
      <ModalProvider>
        <ManagedModal />
        <Login />
      </ModalProvider>
    </QueryClientProvider>
  </>
);

export const Default = Template.bind({});
