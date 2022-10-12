import onboardingBrand from "@repositories/onboarding-brand";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useMutation, useQueryClient } from "react-query";

export const useDeleteOnboardingBrandMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => onboardingBrand.delete(`${API_ENDPOINTS.ONBOARDING_BRANDS}/${id}`),
    {
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.ONBOARDING_BRANDS);
      },
    }
  );
};
