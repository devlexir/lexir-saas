import {
  AttributeValueCreateInput,
  AttributeValueUpdateInput,
} from "@ts-types/generated";

import Base from "./base";

class AttributeValue extends Base<
  AttributeValueCreateInput,
  AttributeValueUpdateInput
> {}

export default new AttributeValue();
