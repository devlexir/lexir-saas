import User from "@repositories/user";
import { QueryOptionsType,QueryParamsType } from "@ts-types/custom.types";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { mapPaginatorData } from "@utils/data-mappers";
import { useQuery } from "react-query";

const fetchUsers = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;
  const {
    page,
    text,
    limit = 15,
    orderBy = "updated_at",
    sortedBy = "DESC",
  } = params as QueryOptionsType;
  const url = `${API_ENDPOINTS.USERS}?search=${text}&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}&with=wallet`;
  const {
    data: { data, ...rest },
  } = await User.all(url);
  return { users: { data, paginatorInfo: mapPaginatorData({ ...rest }) } };
};

const useUsersQuery = (options: QueryOptionsType) => {
  return useQuery<any, Error>([API_ENDPOINTS.USERS, options], fetchUsers, {
    keepPreviousData: true,
  });
};

export { fetchUsers,useUsersQuery };
