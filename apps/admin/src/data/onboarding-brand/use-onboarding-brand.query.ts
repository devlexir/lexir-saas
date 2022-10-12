import onboardingBrand from "@repositories/onboarding-brand";
import { BrandInput as TBrand } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useQuery } from "react-query";

export const fetchOnboardingBrand = async (id: string) => {
  const { data } = await onboardingBrand.find(`${API_ENDPOINTS.ONBOARDING_BRANDS}/${id}`);
  return data;
};

export const useOnboardingBrandQuery = (id: string) => {
  return useQuery<TBrand, Error>([API_ENDPOINTS.ONBOARDING_BRANDS, id], () =>
    fetchOnboardingBrand(id)
  );
};
