import ProductsGridBlock from '@components/product/products-grid-block';
import { usePopularProductsQuery } from '@framework/basic-rest/product/get-all-popular-products';
import { LIMITS } from '@framework/basic-rest/utils/limits';
import type { FC } from 'react';

interface ProductFeedProps {
  className?: string;
}

const PopularProductFeed: FC<ProductFeedProps> = ({ className }) => {
  const limit = LIMITS.POPULAR_PRODUCTS_LIMITS;
  const { data, isLoading, error } = usePopularProductsQuery({
    limit: limit,
  });
  return (
    <ProductsGridBlock
      sectionHeading='text-popular-product'
      sectionSubHeading='text-fresh-grocery-items'
      className={className}
      products={data}
      loading={isLoading}
      error={error?.message}
      limit={limit}
      uniqueKey='popular-product'
    />
  );
};

export default PopularProductFeed;
