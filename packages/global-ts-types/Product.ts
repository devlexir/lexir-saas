export type ProductType = {
  subdomain: string;
  id: number;
  name: string;
  sku: string;
  price: string | null;
  brand: string | null;
  category: string | null;
  size: string | null;
  abv: string | null;
  b2bprice: string | null;
  b2cprice: string | null;
  quantity: string | null;
  imageSRC: string | null;
  slug: string | null;
  description: string | null;
  type_id: number | null;
  shop_id: number | null;
  sale_price: number | null;
  min_price: number | null;
  max_price: number | null;
  preview_url: string | null;
  in_stock: number | null;
  is_taxable: number | null;
  shipping_class_id: number | null;
  status: string | null;
  product_type: string | null;
  unit: string | null;
  height: string | null;
  width: string | null;
  length: string | null;
  author_id: number | null;
  manufacturer_id: number | null;
  is_digital: number | null;
  is_external: number | null;
  external_product_url: string | null;
  external_product_button_text: string | null;
  orders_count: number | null;
  total_downloads: number | null;
  product_status: string | null;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};
