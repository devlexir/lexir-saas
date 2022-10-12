import Shop from "@repositories/shop";
import { QueryParamsType, ShopsQueryOptionsType } from "@ts-types/custom.types";
import { Shop as TShop } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { stringifySearchQuery } from "@utils/data-mappers";
import { useQuery } from "react-query";

type Props = {
  shops: TShop[];
};

const fetchMyShops = async ({ queryKey }: QueryParamsType): Promise<Props> => {
  const [_key, params] = queryKey;

  const {
    page,
    text,
    limit = 15,
    orderBy = "updated_at",
    sortedBy = "DESC",
  } = params as ShopsQueryOptionsType;

  const searchString = stringifySearchQuery({
    name: text,
  });
  const url = `${API_ENDPOINTS.MY_SHOPS}?search=${searchString}&searchJoin=and&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const { data } = await Shop.all(url);
  return {
    shops: data,
  };
};

const useMyShopsQuery = (options: ShopsQueryOptionsType) => {
  return useQuery<Props, Error>(
    [API_ENDPOINTS.MY_SHOPS, options],
    fetchMyShops,
    {
      keepPreviousData: true,
    }
  );
};

export { fetchMyShops,useMyShopsQuery };
