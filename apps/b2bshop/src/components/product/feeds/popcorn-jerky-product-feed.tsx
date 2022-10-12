import ProductsCarousel from '@components/product/products-carousel';
import { usePopcornJerkyProductsQuery } from '@framework/basic-rest/product/get-all-popcorn-jerky-products';
import { LIMITS } from '@framework/basic-rest/utils/limits';
import { ROUTES } from '@utils/routes';

export default function PopcornJerkyProductFeed() {
  const { data, isLoading, error } = usePopcornJerkyProductsQuery({
    limit: LIMITS.POPCORN_JERKY_PRODUCTS_LIMITS,
  });
  return (
    <ProductsCarousel
      sectionHeading='text-popcorn-jerky'
      categorySlug={ROUTES.PRODUCTS}
      products={data}
      loading={isLoading}
      error={error?.message}
      limit={LIMITS.POPCORN_JERKY_PRODUCTS_LIMITS}
      uniqueKey='popcorn-jerky'
    />
  );
}
