import ConfirmationCard from '@components/common/confirmation-card';
import Loader from '@components/ui/loader/loader';
import {
  useModalAction,
  useModalState,
} from '@components/ui/modal/modal.context';

import { useDeleteOrderMutation } from '@data/order/order-delete.mutation';

const OrderDeleteView = () => {
  const {
    mutate: deleteOrder,
    isLoading: loading,
    isSuccess,
  } = useDeleteOrderMutation();

  const { data } = useModalState();
  const { closeModal } = useModalAction();
  if (isSuccess) closeModal();
  if (loading || isSuccess) return <Loader text='Loading' />;
  async function handleDelete() {
    console.log(data);
    deleteOrder(data);
    // closeModal();
  }
  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnLoading={loading}
    />
  );
};

export default OrderDeleteView;
