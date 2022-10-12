import Shop from "@repositories/shop";
import { AddStaffInput } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";

export interface IAddStaffVariables {
  variables: AddStaffInput;
}

export const useAddStaffMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables }: IAddStaffVariables) =>
      Shop.addStaff(API_ENDPOINTS.ADD_STAFF, variables),
    {
      onSuccess: () => {
        router.push(`/${router?.query?.shop}${ROUTES.STAFFS}`);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.STAFFS);
      },
    }
  );
};
