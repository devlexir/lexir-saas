import ConfirmationCard from '@components/common/confirmation-card';
import Loader from '@components/ui/loader/loader';
import {
  useModalAction,
  useModalState,
} from '@components/ui/modal/modal.context';

import { useDeleteShippingAddressMutation } from '@data/customer/address/customer-shipping-address-delete.mutation';

const CustomerShippingAddressDeleteView = () => {
  const {
    mutate: deleteShippingAddress,
    isLoading: loading,
    isSuccess,
  } = useDeleteShippingAddressMutation();

  const { data } = useModalState();
  const { closeModal } = useModalAction();

  if (isSuccess) closeModal();
  if (loading || isSuccess) return <Loader text='Loading' />;

  async function handleDelete() {
    console.log(data);
    deleteShippingAddress(data);
  }

  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnLoading={loading}
    />
  );
};

export default CustomerShippingAddressDeleteView;
