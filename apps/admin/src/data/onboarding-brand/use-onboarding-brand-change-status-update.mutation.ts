import onboardingBrand from "@repositories/onboarding-brand";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

export interface IBrandUpdateVariables {
  variables: {
    id?: string | null;
    input: {
      status: string;
    }
  };
}

export const useOnboardingUpdateBrandChangeStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ variables: { id, input } }: IBrandUpdateVariables) =>
      onboardingBrand.update(`${API_ENDPOINTS.ONBOARDING_BRANDS}/${id}/change-status`, input),
    {
      onSuccess: () => {
        toast.success("Changed Status");

      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.ONBOARDING_BRANDS);
      },
    }
  );
};
