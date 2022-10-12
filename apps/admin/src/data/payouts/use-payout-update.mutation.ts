import payouts from "@repositories/payouts";
import { UpdatePayouts } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

export interface IPayoutUpdateVariables {
  variables: {
    id?: string | null;
    input: UpdatePayouts;
  };
}

export const useUpdatePayoutMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables: { id, input } }: IPayoutUpdateVariables) =>
      payouts.update(`${API_ENDPOINTS.PAYOUTS}/${id}`, input),
    {
      onSuccess: () => {
        toast.success("Brand Updated");
        router.push(`${ROUTES.PAYOUTS}`);

      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.PAYOUTS);
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
