import ConfirmationCard from '@components/common/confirmation-card';
import {
  useModalAction,
  useModalState,
} from '@components/ui/modal/modal.context';

import { useDeleteOnboardingBrandMutation } from '@data/onboarding-brand/brand-onboarding-delete.mutation';

const BrandOnboardingDeleteView = () => {
  const { mutate: deleteOnboardingBrand, isLoading: loading } =
    useDeleteOnboardingBrandMutation();
  const { data } = useModalState();
  const { closeModal } = useModalAction();
  async function handleDelete() {
    console.log(data);
    deleteOnboardingBrand(data);
    closeModal();
  }
  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnLoading={loading}
    />
  );
};

export default BrandOnboardingDeleteView;
