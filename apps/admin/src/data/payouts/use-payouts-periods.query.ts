import payouts from "@repositories/payouts";
import {
  PayoutOptionsType,
  QueryParamsType,
} from "@ts-types/custom.types";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { mapPaginatorData } from "@utils/data-mappers";
import { useQuery } from "react-query";

const fetchPayouts = async ({ queryKey }: QueryParamsType) => {
  const [_key] = queryKey;

  const url = `${API_ENDPOINTS.PAYOUT_PERIOD}`;

  const {
    data: { data, ...rest },
  } = await payouts.all(url);

  return { payoutsPeriod: { data, paginatorInfo: mapPaginatorData({ ...rest }) } };
};

const usePayoutsPeriods = (options: PayoutOptionsType) => {
  return useQuery<any, Error>([API_ENDPOINTS.PAYOUT_PERIOD, options], fetchPayouts, {
    ...options,
    keepPreviousData: true,
  });
};

export { fetchPayouts, usePayoutsPeriods };
