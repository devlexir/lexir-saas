import CheckoutDetails from '@components/_organisms/Checkout/CheckoutDetails';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';

export default {
  title: 'Organisms/Checkout/CheckoutDetails',
  component: CheckoutDetails,
  argTypes: {
    errorMessage: {
      control: 'text',
    },
    addButtonLabel: {
      control: 'text',
    },
  },
} as ComponentMeta<typeof CheckoutDetails>;

const handleEdit: any = (id: number) => {};
const handleDelete: any = (id: number) => {};

const handleSetAsDefault: any = (id: number) => {};

const handleAdd: any = () => {};

const queryClient = new QueryClient();

const Template: ComponentStory<typeof CheckoutDetails> = ({}: any) => (
  <>
    <QueryClientProvider client={queryClient}>
      <CheckoutDetails />
    </QueryClientProvider>
  </>
);

export const Default = Template.bind({});

Default.args = {};
