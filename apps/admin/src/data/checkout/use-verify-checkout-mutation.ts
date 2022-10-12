import Checkout from "@repositories/checkout";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useMutation } from "react-query";

export type VerifyCheckoutInputType = {
  amount: number;
  products: any[];
  billing_address: any;
  shipping_address: any;
};

export const useVerifyCheckoutMutation = () => {
  return useMutation((input: VerifyCheckoutInputType) =>
    Checkout.verify(API_ENDPOINTS.CHECKOUT, input)
  );
};
