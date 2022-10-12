import Product from "@repositories/product";
import { CreateProduct } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

export const useCreateProductMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    (variables: CreateProduct) => Product.create(API_ENDPOINTS.PRODUCTS, variables),
    {
      onSuccess: () => {
        toast.success("Product Created");
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
