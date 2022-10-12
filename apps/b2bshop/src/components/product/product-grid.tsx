import SectionHeader from '@components/common/section-header';
import ProductCard from '@components/product/product-cards/product-card';
import cn from 'classnames';
import type { FC } from 'react';

interface ProductGridProps {
  className?: string;
  sectionHeadingTitle?: string;
  products: [];
}

export const ProductGrid: FC<ProductGridProps> = ({
  className = '',
  sectionHeadingTitle,
  products,
}) => {
  return (
    <>
      {sectionHeadingTitle && (
        <SectionHeader
          sectionHeadingTitle={sectionHeadingTitle}
          headingPosition={'left'}
        />
      )}

      <div
        className={cn(
          'grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-8',
          className
        )}
      >
        {products?.map((product: any) => {
          return (
            <ProductCard key={`product--key-${product.id}`} product={product} />
          );
        })}
      </div>
    </>
  );
};
