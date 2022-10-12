import ForgetPassword from '@components/auth/forget-password-form';
import ManagedModal from '@components/common/modal/managed-modal';
import { ModalProvider } from '@components/common/modal/modal.context';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export default {
  title: 'Organisms/Auth/ForgetPassword',
  component: ForgetPassword,
  argTypes: {},
} as ComponentMeta<typeof ForgetPassword>;

const queryClientRef = new QueryClient();
const Template: ComponentStory<typeof ForgetPassword> = () => (
  <>
    <QueryClientProvider client={queryClientRef}>
      <ModalProvider>
        <ManagedModal />
        <ForgetPassword />
      </ModalProvider>
    </QueryClientProvider>
  </>
);

export const Default = Template.bind({});
