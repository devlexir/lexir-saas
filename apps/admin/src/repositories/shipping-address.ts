import {
  CreateShippingAddress,
  ShippingAddressInput,
  UpdateShippingAddress,
} from '@ts-types/generated';

import Base from './base';

class ShippingAdrress extends Base<
  CreateShippingAddress,
  UpdateShippingAddress
> {
  address = (url: string) => {
    return this.http(url, 'get');
  };
  create = async (url: string, variables: ShippingAddressInput) => {
    return this.http<ShippingAddressInput>(url, 'post', variables);
  };
  update = async (url: string, variables: ShippingAddressInput) => {
    return this.http<ShippingAddressInput>(url, 'put', variables);
  };
}

export default new ShippingAdrress();
