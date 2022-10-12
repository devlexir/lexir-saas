import Lead from '@repositories/lead';
import { LeadInput } from '@ts-types/generated';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

export interface ILeadVariables {
  variables: LeadInput;
}

export const useCreateLeadMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables }: ILeadVariables) =>
      Lead.create(API_ENDPOINTS.LEADS, variables),
    {
      onSuccess: () => {
        toast.success('Thank you! We will be in touch shortly');
        router.push("/");
      },
      onSettled: () => {
        return queryClient.invalidateQueries(API_ENDPOINTS.LEADS);
      },
      onError: (error) => {
        console.log(error);
        // @ts-ignore
        toast.error(`Something went wrong: ${error.message}`, {
          autoClose: 3000,
        });
      },
    }
  );
};
