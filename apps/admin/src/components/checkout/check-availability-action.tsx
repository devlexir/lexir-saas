import Button from '@components/ui/button';
import ValidationError from '@components/ui/validation-error';
import {
  billingAddressAtom,
  shippingAddressAtom,
  verifiedResponseAtom,
} from '@contexts/checkout';
import { useCart } from '@contexts/quick-cart/cart.context';
import { useVerifyCheckoutMutation } from '@data/checkout/use-verify-checkout-mutation';
import { formatOrderedProduct } from '@utils/format-ordered-product';
import { useAtom } from 'jotai';
import omit from 'lodash/omit';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

export const CheckAvailabilityAction: React.FC = (props) => {
  const { t } = useTranslation('common');

  const [billing_address] = useAtom(billingAddressAtom);
  const [shipping_address] = useAtom(shippingAddressAtom);
  const [_, setVerifiedResponse] = useAtom(verifiedResponseAtom);

  const [errorMessage, setError] = useState('');
  const { items, total, isEmpty } = useCart();

  const { mutate: verifyCheckout, isLoading: loading } =
    useVerifyCheckoutMutation();

  function handleVerifyCheckout() {
    if (billing_address && shipping_address) {
      verifyCheckout(
        {
          amount: total,
          products: items?.map((item) => formatOrderedProduct(item)),
          billing_address: {
            ...(billing_address?.address &&
              omit(billing_address.address, ['__typename'])),
          },
          shipping_address: {
            ...(shipping_address?.address &&
              omit(shipping_address.address, ['__typename'])),
          },
        },
        {
          onSuccess: ({ data }: any) => {
            //@ts-ignore
            setVerifiedResponse(data);
          },
          onError: (error: any) => {
            setError(error?.message);
          },
        }
      );
    } else {
      setError('error-add-both-address');
    }
  }

  return (
    <>
      <Button
        loading={loading}
        className="w-full mt-5"
        onClick={handleVerifyCheckout}
        disabled={isEmpty}
        {...props}
      />
      {errorMessage && (
        <div className="mt-3">
          <ValidationError message={t(errorMessage)} />
        </div>
      )}
    </>
  );
};
