import ConfirmationCard from '@components/common/confirmation-card';
import Loader from '@components/ui/loader/loader';
import {
  useModalAction,
  useModalState,
} from '@components/ui/modal/modal.context';

import { useDeleteBrandMutation } from '@data/brand/brand-delete.mutation';

const BrandDeleteView = () => {
  const {
    mutate: deleteBrand,
    isLoading: loading,
    isSuccess,
  } = useDeleteBrandMutation();
  const { data } = useModalState();
  const { closeModal } = useModalAction();
  if (isSuccess) closeModal();
  if (loading || isSuccess) return <Loader text='Loading' />;
  async function handleDelete() {
    console.log(data);
    deleteBrand(data);
  }
  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnLoading={loading}
    />
  );
};

export default BrandDeleteView;
