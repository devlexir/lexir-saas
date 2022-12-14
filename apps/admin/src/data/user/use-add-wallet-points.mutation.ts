import User from "@repositories/user";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useTranslation } from "next-i18next";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
export interface IAddWalletPointsVariables {
  variables: {
    input: { customer_id: string; points: number };
  };
}

export const useAddWalletPointsMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation(
    ({ variables: { input } }: IAddWalletPointsVariables) =>
      User.addWalletPoints(API_ENDPOINTS.ADD_WALLET_POINTS, input),
    {
      onSuccess: () => {
        toast.success(t("common:successfully-updated"));
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.USERS);
      },
    }
  );
};
