import Category from "@repositories/category";
import {
  CategoriesQueryOptionsType,
  QueryParamsType,
} from "@ts-types/custom.types";
import { CategoryPaginator } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { mapPaginatorData, stringifySearchQuery } from "@utils/data-mappers";
import { useQuery } from "react-query";

const fetchCategories = async ({
  queryKey,
}: QueryParamsType): Promise<{ categories: CategoryPaginator }> => {
  const [_key, params] = queryKey;

  const {
    page,
    text,
    type,
    limit = 15,
    orderBy = "updated_at",
    sortedBy = "DESC",
    parent,
  } = params as CategoriesQueryOptionsType;

  const searchString = stringifySearchQuery({
    name: text,
    type,
  });
  // @ts-ignore
  const queryParams = new URLSearchParams({
    searchJoin: "and",
    orderBy,
    sortedBy,
    ...(typeof parent === undefined ? {} : { parent }),
    limit: limit.toString(),
    ...(page && { page: page.toString() }),
    ...(Boolean(searchString) && { search: searchString }),
  });
  const url = `${API_ENDPOINTS.CATEGORIES}?${queryParams.toString()}`;
  const {
    data: { data, ...rest },
  } = await Category.all(url);
  return {
    categories: {
      data,
      paginatorInfo: mapPaginatorData({ ...rest }),
    },
  };
};

const useCategoriesQuery = (options: CategoriesQueryOptionsType) => {
  return useQuery<{ categories: CategoryPaginator }, Error>(
    [API_ENDPOINTS.CATEGORIES, options],
    fetchCategories,
    {
      keepPreviousData: true,
    }
  );
};

export { fetchCategories,useCategoriesQuery };
