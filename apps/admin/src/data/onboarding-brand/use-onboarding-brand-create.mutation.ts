import onboardingBrand from "@repositories/onboarding-brand";
import { OnboardingBrandInput } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

export interface IBrandVariables {
  variables: OnboardingBrandInput;
}

export const useCreateOnboardingBrandMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables }: IBrandVariables) =>
      onboardingBrand.create(API_ENDPOINTS.ONBOARDING_BRANDS, variables),
    {
      onSuccess: () => {
        toast.success("Thank you! We will be in touch shortly");
        router.push(ROUTES.ONBOARDINGBRANDS);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.ONBOARDING_BRANDS);
      },
      onError: (e) => {
        console.log(e);
      },
    }
  );
};
