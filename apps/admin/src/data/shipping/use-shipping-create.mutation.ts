import Shipping from "@repositories/shipping";
import { ShippingInput } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";

export interface IShippingCreateVariables {
  variables: {
    input: ShippingInput;
  };
}

export const useCreateShippingClassMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables: { input } }: IShippingCreateVariables) =>
      Shipping.create(API_ENDPOINTS.SHIPPINGS, input),
    {
      onSuccess: () => {
        router.push(ROUTES.SHIPPINGS);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.SHIPPINGS);
      },
    }
  );
};
