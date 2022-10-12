import User from "@repositories/user";
import { UpdateUser } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useTranslation } from "next-i18next";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

export interface IUserUpdateVariables {
  variables: { id: number; input: UpdateUser };
}

export const useUpdateUserMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation(
    ({ variables: { id, input } }: IUserUpdateVariables) =>
      User.update(`${API_ENDPOINTS.USERS}/${id}`, input),
    {
      onSuccess: () => {
        toast.success(t("common:successfully-updated"));
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.ME);
        queryClient.invalidateQueries(API_ENDPOINTS.USERS);
      },
    }
  );
};
