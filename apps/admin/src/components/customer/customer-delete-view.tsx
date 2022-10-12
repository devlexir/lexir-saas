import ConfirmationCard from '@components/common/confirmation-card';
import Loader from '@components/ui/loader/loader';
import {
  useModalAction,
  useModalState,
} from '@components/ui/modal/modal.context';

import { useDeleteCustomerMutation } from '@data/customer/customer-delete.mutation';

const CustomerDeleteView = () => {
  const {
    mutate: deleteCustomer,
    isLoading: loading,
    isSuccess,
  } = useDeleteCustomerMutation();
  const { data } = useModalState();
  const { closeModal } = useModalAction();
  if (isSuccess) closeModal();
  if (loading || isSuccess) return <Loader text='Loading' />;
  async function handleDelete() {
    console.log(data);
    deleteCustomer(data);
  }
  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnLoading={loading}
    />
  );
};

export default CustomerDeleteView;
