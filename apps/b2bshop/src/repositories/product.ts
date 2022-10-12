import Base from './base';

class Product extends Base<any> {
  popularProducts = (url: string) => {
    return this.http(url, 'get');
  };
}

export default new Product();
