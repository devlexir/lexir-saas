import ConfirmationCard from '@components/common/confirmation-card';
import Loader from '@components/ui/loader/loader';
import {
  useModalAction,
  useModalState,
} from '@components/ui/modal/modal.context';

import { useUpdateOrderChangeStatusMutation } from '@data/order/use-order-change-status.mutation';

const ChangeOrderStatus = () => {
  const {
    mutate: updateOrder,
    isLoading: updating,
    isSuccess,
  } = useUpdateOrderChangeStatusMutation();

  const { data } = useModalState();
  const { closeModal } = useModalAction();

  if (isSuccess) closeModal();
  if (updating || isSuccess) return <Loader text='Loading' />;

  async function handleChangeStatus() {
    console.log(data);
    updateOrder({
      variables: data,
    });
  }

  return (
    <ConfirmationCard
      title='Change Status'
      description='Are you sure you want to change the order status?'
      cancelBtnText='Cancel'
      deleteBtnText='Confirm'
      onCancel={closeModal}
      onDelete={handleChangeStatus}
      deleteBtnLoading={updating}
      cancelChangeBtnClassName='w-full rounded bg-red-600 py-2 px-4 text-center text-base font-semibold text-light shadow-md transition duration-200 ease-in hover:bg-red-700 focus:bg-red-700 focus:outline-none'
      deleteChangeBtnClassName='w-full py-2 px-4 bg-accent focus:outline-none hover:bg-accent-hover focus:bg-accent-hover text-light transition ease-in duration-200 text-center text-base font-semibold rounded shadow-md'
    />
  );
};

export default ChangeOrderStatus;
