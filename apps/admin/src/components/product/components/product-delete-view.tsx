import ConfirmationCard from '@components/common/confirmation-card';
import Loader from '@components/ui/loader/loader';
import {
  useModalAction,
  useModalState,
} from '@components/ui/modal/modal.context';
import { useDeleteProductMutation } from '@data/product/product-delete.mutation';

const ProductDeleteView = () => {
  const {
    mutate: deleteProduct,
    isLoading: loading,
    isSuccess,
  } = useDeleteProductMutation();
  const { data } = useModalState();
  const { closeModal } = useModalAction();
  if (isSuccess) closeModal();
  if (loading || isSuccess) return <Loader text='Loading' />;
  async function handleDelete() {
    console.log(data);
    deleteProduct(data);
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

export default ProductDeleteView;
