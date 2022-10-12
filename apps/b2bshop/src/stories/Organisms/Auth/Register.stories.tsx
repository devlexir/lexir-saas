import Register from '@components/auth/sign-up-form';
import ManagedModal from '@components/common/modal/managed-modal';
import { ModalProvider } from '@components/common/modal/modal.context';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export default {
  title: 'Organisms/Auth/Register',
  component: Register,
  argTypes: {},
} as ComponentMeta<typeof Register>;

const queryClientRef = new QueryClient();
const Template: ComponentStory<typeof Register> = () => (
  <>
    <QueryClientProvider client={queryClientRef}>
      <ModalProvider>
        <ManagedModal />
        <Register />
      </ModalProvider>
    </QueryClientProvider>
  </>
);

export const Default = Template.bind({});
