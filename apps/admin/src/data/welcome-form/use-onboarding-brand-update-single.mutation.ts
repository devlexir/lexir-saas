import OnboardingBrandSingle from "@repositories/onboarding-single-brand";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useMutation, useQueryClient } from "react-query";

export interface IBrandUpdateVariables {
  variables: {
    id?: string | null;
    input: any;
  };
}

export const useOnboardingUpdateBrandSingleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ variables: { id, input } }: IBrandUpdateVariables) =>
      OnboardingBrandSingle.update(`${API_ENDPOINTS.ONBOARDING_BRANDS}/${id}`, input),
    {
      onSuccess: () => {

      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.ONBOARDING_BRANDS);
      },
    }
  );
};
