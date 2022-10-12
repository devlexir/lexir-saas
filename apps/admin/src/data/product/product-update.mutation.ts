import Product from "@repositories/product";
import { UpdateProduct } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

export interface IProductUpdateVariables {
  variables: { id: string; input: UpdateProduct };
}

export const useUpdateProductMutation = () => {
  const router = useRouter();

  const queryClient = useQueryClient();
  return useMutation(
    ({ variables: { id, input } }: IProductUpdateVariables) =>
      Product.update(`${API_ENDPOINTS.PRODUCTS}/${id}`, input),
    {
      onSuccess: () => {
        toast.success("Product Updated");
        router.push(`${ROUTES.PRODUCTS}`);
      },
      // Always refetch after error or success:
      onSettled: () => {
        return queryClient.invalidateQueries(API_ENDPOINTS.PRODUCTS);
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
