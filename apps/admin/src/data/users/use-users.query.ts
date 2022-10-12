import users from "@repositories/users";
import {
  UsersQueryOptionsType,
  QueryParamsType,
} from "@ts-types/custom.types";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { mapPaginatorData } from "@utils/data-mappers";
import { useQuery } from "react-query";

const fetchUsers = async ({ queryKey }: QueryParamsType) => {
  const [_key] = queryKey;

  const url = `${API_ENDPOINTS.USERS}`;

  const {
    data: { data, ...rest },
  } = await users.all(url);

  return { users: { data, paginatorInfo: mapPaginatorData({ ...rest }) } };
};

const useUsersQuery = (options: UsersQueryOptionsType) => {
  return useQuery<any, Error>([API_ENDPOINTS.USERS, options], fetchUsers, {
    ...options,
    keepPreviousData: true,
  });
};

export { fetchUsers, useUsersQuery };
