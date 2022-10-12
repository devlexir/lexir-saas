import Attribute from "@repositories/attribute";
import { AttributeInput } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";

export interface IAttributeCreateVariables {
  variables: {
    input: AttributeInput;
  };
}

export const useCreateAttributeMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables: { input } }: IAttributeCreateVariables) =>
      Attribute.create(API_ENDPOINTS.ATTRIBUTES, input),
    {
      onSuccess: () => {
        router.push(`/${router?.query?.shop}${ROUTES.ATTRIBUTES}`);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.ATTRIBUTES);
      },
    }
  );
};
