import { useModalAction } from '@components/common/modal/modal.context';
import ProductCard from '@components/product/product-cards/product-card';
import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import { useProductsQuery } from '@framework/basic-rest/product/get-all-products';
import { Product } from '@framework/basic-rest/types';
import { LIMITS } from '@framework/basic-rest/utils/limits';
import cn from 'classnames';
import slice from 'lodash/slice';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import type { FC } from 'react';

interface ProductFeedProps {
  element?: any;
  className?: string;
}
const AllProductFeed: FC<ProductFeedProps> = ({ element, className = '' }) => {
  const { query } = useRouter();
  const {
    isFetching: isLoading,
    isFetchingNextPage: loadingMore,
    fetchNextPage,
    hasNextPage,
    data,
    error,
  } = useProductsQuery({ limit: LIMITS.PRODUCTS_LIMITS, ...query });

  const { openModal } = useModalAction();

  function handleCategoryPopup() {
    openModal('CATEGORY_VIEW');
  }

  return (
    <div className={cn(className)}>
      {error ? (
        <Alert message={error?.message} />
      ) : (
        <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 2xl:gap-5 3xl:grid-cols-6'>
          {isLoading && !data?.pages?.length ? (
            Array.from({ length: LIMITS.PRODUCTS_LIMITS }).map((_, idx) => (
              <ProductCardLoader
                key={`product--key-${idx}`}
                uniqueKey={`product--key-${idx}`}
              />
            ))
          ) : (
            <>
              {data?.pages?.map((page: any, index) => {
                return (
                  <Fragment key={index}>
                    {page?.data?.slice(0, 18)?.map((product: Product) => (
                      <ProductCard
                        key={`product--key${product.id}`}
                        product={product}
                      />
                    ))}
                    {element && <div className='col-span-full'>{element}</div>}
                    {page?.data?.length! > 18 &&
                      slice(page?.data, 18, page?.data?.length).map(
                        (product: any) => (
                          <ProductCard
                            key={`product--key${product.id}`}
                            product={product}
                          />
                        )
                      )}
                  </Fragment>
                );
              })}
            </>
          )}
        </div>
      )}
      {hasNextPage && (
        <div className='pt-8 text-center xl:pt-10'>
          <Button
            loading={loadingMore}
            disabled={loadingMore}
            onClick={() => fetchNextPage()}
          >
            {'Load More'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default AllProductFeed;
