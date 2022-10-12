import { OnboardingUpdateBrandSingle } from "@ts-types/generated";

import Base from "./base";

class OnboardingBrandSingle extends Base<OnboardingUpdateBrandSingle, any> {
  create = async (url: string, variables: OnboardingUpdateBrandSingle) => {
    return this.http<OnboardingUpdateBrandSingle>(url, "post", variables);
  };
}

export default new OnboardingBrandSingle();
