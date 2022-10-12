import { ShippingInput, ShippingUpdateInput } from "@ts-types/generated";

import Base from "./base";

class Shipping extends Base<ShippingInput, ShippingUpdateInput> {}

export default new Shipping();
