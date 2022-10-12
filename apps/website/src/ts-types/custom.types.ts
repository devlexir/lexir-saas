import { QueryKey } from 'react-query';

import { SortOrder } from './generated';

export type AuthorsQueryOptionsType = {
  text?: string;
  is_approved?: boolean;
  page?: number;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};
export type ManufacturersQueryOptionsType = {
  text?: string;
  is_approved?: boolean;
  type?: string;
  page?: number;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};
export type CategoriesQueryOptionsType = {
  type?: string;
  text?: string;
  page?: number;
  parent?: number | null;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};
export type TagsQueryOptionsType = {
  type?: string;
  text?: string;
  page?: number;
  parent?: number | null;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};
export type ShopsQueryOptionsType = {
  text?: string;
  page?: number;
  parent?: number | null;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};
export type WithdrawsQueryOptionsType = {
  text?: string;
  shop_id?: number;
  page?: number;
  parent?: number | null;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};
export type ProductsQueryOptionsType = {
  subdomain: string;
  page?: number;
  shop_id?: number;
  text?: string;
  type?: string;
  category?: string;
  status?: string;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
  brandFilterProducts?: string;
  categoryFilterProducts?: string;
  productNameFilterProducts?: string;
  skuFilterProducts?: string;
};
export type TypesQueryOptionsType = {
  page?: number;
  text?: string;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};
export type StaffsQueryOptionsType = {
  page?: number;
  shop_id?: number;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};

export type QueryOptionsType = {
  subdomain: string;
  page?: number;
  text?: string;
  shop_id?: number;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
  orderIdFilterOrder?: string;
  customerFilterOrder?: string;
  customerTypeFilterOrder?: string;
  orderValueMinFilterOrder?: string;
  orderValueMaxFilterOrder?: string;
  orderDateStartFilterOrder?: string;
  orderDateEndFilterOrder?: string;
  startDate?: string;
  endDate?: string;
};

export type QueryParamsType = {
  queryKey: QueryKey;
  pageParam?: string;
};

export type CustomersQueryOptionsType = {
  subdomain: string;
  page?: number;
  text?: string;
  shop_id?: number;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};

export type CustomerQueryOptionsType = {
  subdomain: string;
  page?: number;
  text?: string;
  shop_id?: number;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};

export type BrandsQueryOptionsType = {
  subdomain: string;
  brand_name?: string;
  brand_id?: string;
  country?: string;
  commission?: number;
  type_relationship?: string;
  plan?: string;
  website?: string;
  logo_src?: string;
};
