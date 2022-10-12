import ProductsCarousel from '@components/product/products-carousel';
import { useChipsProductsQuery } from '@framework/basic-rest/product/get-all-chips-products';
import { LIMITS } from '@framework/basic-rest/utils/limits';
import { ROUTES } from '@utils/routes';

export default function ChipsProductFeed() {
  const { data, isLoading, error } = useChipsProductsQuery({
    limit: LIMITS.CHIPS_PRODUCTS_LIMITS,
  });
  return (
    <ProductsCarousel
      sectionHeading='text-chips-collection'
      categorySlug={ROUTES.PRODUCTS}
      products={data}
      loading={isLoading}
      error={error?.message}
      limit={LIMITS.CHIPS_PRODUCTS_LIMITS}
      uniqueKey='chips-product'
    />
  );
}
