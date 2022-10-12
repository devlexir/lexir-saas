import ProductsCarousel from '@components/product/products-carousel';
import { useCookiesProductsQuery } from '@framework/basic-rest/product/get-all-cookies-products';
import { LIMITS } from '@framework/basic-rest/utils/limits';
import { ROUTES } from '@utils/routes';

export default function CookiesProductFeed() {
  const { data, isLoading, error } = useCookiesProductsQuery({
    limit: LIMITS.COOKIES_PRODUCTS_LIMITS,
  });
  return (
    <ProductsCarousel
      sectionHeading='text-cookies-cakes'
      categorySlug={ROUTES.PRODUCTS}
      products={data}
      loading={isLoading}
      error={error?.message}
      limit={LIMITS.COOKIES_PRODUCTS_LIMITS}
      uniqueKey='cookies-cakes'
    />
  );
}
