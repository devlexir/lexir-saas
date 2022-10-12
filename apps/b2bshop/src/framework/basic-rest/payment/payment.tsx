import { API_ENDPOINTS } from '@framework/basic-rest/utils/api-endpoints';
import http from '@framework/basic-rest/utils/http';
import { useQuery } from 'react-query';

const fetchPayment = async () => {
  const { data } = await http.get(API_ENDPOINTS.PAYMENT);
  return {
    data: data,
  };
};

const usePaymentQuery = () => {
  return useQuery([API_ENDPOINTS.PAYMENT], fetchPayment);
};

export { usePaymentQuery, fetchPayment };
