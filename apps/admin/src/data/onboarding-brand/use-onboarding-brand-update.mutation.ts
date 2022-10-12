import onboardingBrand from "@repositories/onboarding-brand";
import { OnboardingUpdateBrand } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

export interface IBrandUpdateVariables {
  variables: {
    id?: string | null;
    input: OnboardingUpdateBrand;
  };
}

export const useOnboardingUpdateBrandMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables: { id, input } }: IBrandUpdateVariables) =>
      onboardingBrand.update(`${API_ENDPOINTS.ONBOARDING_BRANDS}/${id}`, input),
    {
      onSuccess: () => {
        toast.success("Brand Updated");
        router.push(`${ROUTES.ONBOARDINGBRANDS}`);

      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.ONBOARDING_BRANDS);
      },
    }
  );
};
