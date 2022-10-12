import ConfirmationCard from '@components/common/confirmation-card';
import Loader from '@components/ui/loader/loader';
import {
  useModalAction,
  useModalState,
} from '@components/ui/modal/modal.context';

import { useDeleteBillingAddressMutation } from '@data/customer/address/customer-billing-address-delete.mutation';

const CustomerBillingAddressDeleteView = () => {
  const {
    mutate: deleteBillingAddress,
    isLoading: loading,
    isSuccess,
  } = useDeleteBillingAddressMutation();

  const { data } = useModalState();
  const { closeModal } = useModalAction();

  if (isSuccess) closeModal();
  if (loading || isSuccess) return <Loader text='Loading' />;

  async function handleDelete() {
    console.log(data);
    deleteBillingAddress(data);
  }

  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnLoading={loading}
    />
  );
};

export default CustomerBillingAddressDeleteView;
