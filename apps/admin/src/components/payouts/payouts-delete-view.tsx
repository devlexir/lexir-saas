import ConfirmationCard from '@components/common/confirmation-card';
import Loader from '@components/ui/loader/loader';
import {
  useModalAction,
  useModalState,
} from '@components/ui/modal/modal.context';

import { useDeletePayoutMutation } from '@data/payouts/payout-delete.mutation';

const PayoutsDeleteView = () => {
  const {
    mutate: deletePayout,
    isLoading: loading,
    isSuccess,
  } = useDeletePayoutMutation();

  const { data } = useModalState();
  const { closeModal } = useModalAction();
  if (isSuccess) closeModal();
  if (loading || isSuccess) return <Loader text='Loading' />;

  async function handleDelete() {
    deletePayout(data);
  }

  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnLoading={loading}
    />
  );
};

export default PayoutsDeleteView;
