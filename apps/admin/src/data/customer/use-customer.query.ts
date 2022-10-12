import Customer from "@repositories/customer";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useQuery } from "react-query";

const fetchUser = async (customerId: string) => {
  const { data } = await Customer.find(`${API_ENDPOINTS.CUSTOMERS}/${customerId}`);
  return data;
};

const useCustomerQuery = (customerId: string) => {
  return useQuery<any, Error>([API_ENDPOINTS.CUSTOMERS, customerId], () => fetchUser(customerId)
  )
};

export { fetchUser,useCustomerQuery };
