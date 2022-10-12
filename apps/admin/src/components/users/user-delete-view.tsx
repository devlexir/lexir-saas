import ConfirmationCard from '@components/common/confirmation-card';
import Loader from '@components/ui/loader/loader';
import {
  useModalAction,
  useModalState,
} from '@components/ui/modal/modal.context';

import { useDeleteUserMutation } from '@data/users/user-delete.mutation';

const UserDeleteView = () => {
  const {
    mutate: deleteUser,
    isLoading: loading,
    isSuccess,
  } = useDeleteUserMutation();
  const { data } = useModalState();
  const { closeModal } = useModalAction();
  if (isSuccess) closeModal();
  if (loading || isSuccess) return <Loader text='Loading' />;
  async function handleDelete() {
    console.log(data);
    deleteUser(data);
  }
  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnLoading={loading}
    />
  );
};

export default UserDeleteView;
