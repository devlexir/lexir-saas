import users from "@repositories/users";
import { UserInput as TUser } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useQuery } from "react-query";

export const fetchUser = async (id: string) => {
  const { data } = await users.find(`${API_ENDPOINTS.USERS}/${id}`);
  return data;
};

export const useUserQuery = (id: string) => {
  return useQuery<TUser, Error>([API_ENDPOINTS.USERS, id], () =>
    fetchUser(id)
  );
};
