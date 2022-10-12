import { useRouter } from 'next/router';

import { useModalAction } from '@components/ui/modal/modal.context';

import { API_ENDPOINTS } from '@utils/api/endpoints';
import { ROUTES } from '@utils/routes';

import RadioGroupSelectShipping from './radio-group-shipping';

const ShippingAddress = ({
  id,
  data,
  selected,
  setSelected,
  label,
  errorMessage,
  addButton,
  handleAddAddress,
}: any) => {
  const router = useRouter();
  const { query } = useRouter();
  const { openModal } = useModalAction();

  function handleEdit(id: number) {
    router.push(
      `${ROUTES.CUSTOMERS}/${query.customerId}/${API_ENDPOINTS.CUSTOMERS_SHIPPING_ADDRESS}/${id}`
    );
  }

  function handleDelete(id: number) {
    openModal('DELETE_SHIPPING_ADDRESS', id);
  }

  function handleAdd() {
    router.push(`${ROUTES.CUSTOMERS}/${query.customerId}/shipping-address`);
  }

  return (
    <RadioGroupSelectShipping
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      handleAdd={handleAdd}
      id={id}
      data={data}
      selected={selected}
      setSelected={setSelected}
      label={label}
      errorMessage={errorMessage}
      addButton={addButton}
      handleAddAddress={handleAddAddress}
    />
  );
};

export default ShippingAddress;
