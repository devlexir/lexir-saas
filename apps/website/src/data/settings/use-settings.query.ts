import Settings from "@repositories/settings";
import { Settings as TSettings } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useQuery } from "react-query";

export const fetchSettings = async () => {
  const { data } = await Settings.all(API_ENDPOINTS.SETTINGS);
  return data;
};

export const useSettingsQuery = () => {
  return useQuery<TSettings, Error>([API_ENDPOINTS.SETTINGS], () =>
    fetchSettings()
  );
};
