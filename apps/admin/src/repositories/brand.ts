import { BrandInput,CreateBrand, UpdateBrand } from "@ts-types/generated";

import Base from "./base";

class Brand extends Base<CreateBrand, UpdateBrand> {
  create = async (url: string, variables: BrandInput) => {
    return this.http<BrandInput>(url, "post", variables);
  };
}

export default new Brand();
