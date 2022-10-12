import Type from "@repositories/type";
import { CreateTypeInput } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";

export interface ITypeCreateVariables {
  variables: {
    input: CreateTypeInput;
  };
}

export const useCreateTypeMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables: { input } }: ITypeCreateVariables) =>
      Type.create(API_ENDPOINTS.TYPES, input),
    {
      onSuccess: () => {
        router.push(ROUTES.GROUPS);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.TYPES);
      },
    }
  );
};
