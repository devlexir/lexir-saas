import payouts from "@repositories/payouts";
import { CreatePayouts } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

export interface IPayoutVariables {
  variables: CreatePayouts;
}

export const useCreatePayoutMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables }: IPayoutVariables) =>
      payouts.create(API_ENDPOINTS.PAYOUTS, variables),
    {
      onSuccess: () => {
        toast.success("Payout Created!");
        router.push(ROUTES.PAYOUTS);
      },
      // Always refetch after error or success:
      onSettled: () => {
        return queryClient.invalidateQueries(API_ENDPOINTS.PAYOUTS);
      },
      onError: (error) => {
        console.log(error);
        // @ts-ignore
        toast.error(`Something went wrong: ${error.message}`, {
          autoClose: 3000,
        });
      },
    }
  );
};
