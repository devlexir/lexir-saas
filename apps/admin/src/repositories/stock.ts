import { StockInput, CreateStocks, UpdateStocks } from "@ts-types/generated";

import Base from "./base";

class Stock extends Base<CreateStocks, UpdateStocks> {
  create = async (url: string, variables: StockInput) => {
    return this.http<StockInput>(url, "post", variables);
  };
}

export default new Stock();
