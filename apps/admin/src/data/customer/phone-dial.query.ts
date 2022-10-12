import Payouts from "@repositories/payouts";
import {
  BrandsQueryOptionsType,
  QueryParamsType,
} from "@ts-types/custom.types";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { mapPaginatorData } from "@utils/data-mappers";
import { useQuery } from "react-query";

const fetchPhoneDial = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;

  const { subdomain } = params as BrandsQueryOptionsType;

  const url = `${API_ENDPOINTS.PHONE_DIALS}?subdomain=${subdomain}`;

  const {
    data: { data, ...rest },
  } = await Payouts.all(url);

  return { phone: { data, paginatorInfo: mapPaginatorData({ ...rest }) } };
};

const usePhoneDialQuery = (options: BrandsQueryOptionsType) => {
  return useQuery<any, Error>([API_ENDPOINTS.PHONE_DIALS, options], fetchPhoneDial, {
    keepPreviousData: true,
  });
};

export { fetchPhoneDial, usePhoneDialQuery };
