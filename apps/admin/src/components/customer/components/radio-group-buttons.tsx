import { useUpdateBillingAddressMutation } from '@data/customer/address/use-customer-billing-address-set-as-default.mutation';
import { useUpdateShippingAddressMutation } from '@data/customer/address/use-customer-shipping-address-set-as-default.mutation';

interface IRadioGroupButtons {
  data: any;
  handleEdit: any;
  handleDelete: any;
  billingAddress: boolean;
  shippingAddress: boolean;
}

const RadioGroupButtons = ({
  data,
  handleEdit,
  handleDelete,
  billingAddress,
  shippingAddress,
}: IRadioGroupButtons) => {
  const { mutate: setAsDefaultShipping } = useUpdateShippingAddressMutation();
  const { mutate: setAsDefaultBilling } = useUpdateBillingAddressMutation();

  async function handleSetAsDefault(id: any) {
    if (shippingAddress) {
      setAsDefaultShipping({
        variables: {
          shippingId: id,
          input: {},
        },
      });
    }
    if (billingAddress) {
      setAsDefaultBilling({
        variables: {
          billingId: id,
          input: {},
        },
      });
    }
  }

  return (
    <div className=' flex gap-x-1 text-xs font-semibold'>
      <button
        type='button'
        className='text-[#1C8C64] hover:underline'
        onClick={() => handleEdit(data.id)}
      >
        Edit
      </button>
      |
      <button
        type='button'
        className='text-[#1C8C64] hover:underline'
        onClick={() => handleDelete(data.id)}
      >
        Delete
      </button>
      {!data.default && (
        <>
          |
          <button
            type='button'
            className='text-[#1C8C64] hover:underline'
            onClick={() => handleSetAsDefault(data.id)}
          >
            Set as default
          </button>
        </>
      )}
    </div>
  );
};

export default RadioGroupButtons;
