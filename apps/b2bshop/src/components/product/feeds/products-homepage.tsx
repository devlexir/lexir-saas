import ProductsGridBlock from '../products-grid-block';
import { useBestSellerGroceryProductsQuery } from '@framework/basic-rest/product/get-all-best-seller-grocery-products';
import { LIMITS } from '@framework/basic-rest/utils/limits';
import type { FC } from 'react';

interface ProductFeedProps {
  className?: string;
}

const ProductsHomepageFeed: FC<ProductFeedProps> = ({ className }) => {
  const { data, isLoading, error } = useBestSellerGroceryProductsQuery({
    limit: LIMITS.BEST_SELLER_GROCERY_PRODUCTS_LIMITS,
  });
  return (
    <ProductsGridBlock
      sectionHeading='Latest Discoveries'
      sectionSubHeading=''
      className={className}
      products={data}
      loading={isLoading}
      error={error?.message}
      limit={LIMITS.BEST_SELLER_GROCERY_PRODUCTS_LIMITS}
      uniqueKey='best-sellers'
    />
  );
};
export default ProductsHomepageFeed;
