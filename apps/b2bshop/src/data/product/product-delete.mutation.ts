import Product from "@repositories/product";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useMutation, useQueryClient } from "react-query";

import { useAtom } from "jotai";
import { productDelete } from "@contexts/delete_obsever";
import { toast } from "react-toastify";

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();

  // ** State for delete product obsever ** //
  const [isProductDelete, setisProductDelete] = useAtom(
    productDelete
  );

  return useMutation(
    (id: string) => Product.delete(`${API_ENDPOINTS.PRODUCTS}/${id}`),
    {
      onSuccess: () => {
        setisProductDelete(!isProductDelete)
        toast("Product Deleted!");
      },
      // Always refetch after error or success:
      onSettled: () => {
        return queryClient.invalidateQueries(API_ENDPOINTS.PRODUCTS);
      },
      onError: (error) => {
        // @ts-ignore
        toast.error(`Something went wrong: ${error.message}`, {
          autoClose: 3000,
        });
      },
    }
  );
};
