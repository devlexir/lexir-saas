import Payout from "@repositories/category";
import { PayoutsInput as TPayout } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useQuery } from "react-query";

export const fetchPayout = async (id: string) => {
  const { data } = await Payout.find(`${API_ENDPOINTS.PAYOUTS}/${id}`);
  return data;
};

export const usePayoutQuery = (id: string) => {
  return useQuery<TPayout, Error>([API_ENDPOINTS.PAYOUTS, id], () =>
    fetchPayout(id)
  );
};
