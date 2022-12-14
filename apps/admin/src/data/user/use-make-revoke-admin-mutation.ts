import User from "@repositories/user";
import { MakeAdminInput } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useTranslation } from "next-i18next";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

export interface IMakeAdminVariables {
  input: MakeAdminInput;
}

export const useMakeOrRevokeAdminMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation(
    ({ input }: IMakeAdminVariables) =>
      User.makeAdmin(API_ENDPOINTS.MAKE_ADMIN, input),
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
