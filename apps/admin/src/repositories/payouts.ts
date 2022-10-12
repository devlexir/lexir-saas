import { PayoutsInput, CreatePayouts, UpdatePayouts } from "@ts-types/generated";

import Base from "./base";

class Payouts extends Base<CreatePayouts, UpdatePayouts> {
  create = async (url: string, variables: PayoutsInput) => {
    return this.http<PayoutsInput>(url, "post", variables);
  };
  all = async (url: string) => {
    return this.http<PayoutsInput>(url, "get");
  };
}

export default new Payouts();
