import DownloadApps from '@components/common/download-apps';
import Layout from '@components/layout/layout';
import { ProductGrid } from '@components/product/product-grid';
import { ShopFilters } from '@components/search/filters';
import SearchTopBar from '@components/search/search-top-bar';
import Seo from '@components/seo/seo';
import Container from '@components/ui/container';
import Heading from '@components/ui/heading';
import { useFilter } from '@contexts/filter/filter.context';
import { useProductsQuery } from '@data/product/products.query';
import { GetServerSideProps } from 'next';
import { Element } from 'react-scroll';

export default function Products() {
  const { filters } = useFilter();

  const { data: productQueryResult } = useProductsQuery({
    subdomain: filters.subdomain,
  });

  return (
    <>
      <Seo
        title='Products'
        description='Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS.'
        path='products'
      />
      <Container>
        <Heading variant='collectionHeading' className='mt-10'>
          Spirits
        </Heading>
        <Element name='grid' className='flex pb-16 pt-7 lg:pt-11 lg:pb-20'>
          <div className='top-16 hidden h-full w-80 shrink-0 ltr:pr-8 rtl:pl-8 lg:block xl:w-96 xl:ltr:pr-16 xl:rtl:pl-16'>
            <ShopFilters />
          </div>
          <div className='w-full lg:-mt-1'>
            <SearchTopBar
              numberProducts={productQueryResult?.products?.data.length}
            />
            <ProductGrid products={productQueryResult?.products?.data} />
          </div>
        </Element>
      </Container>
      <DownloadApps />
    </>
  );
}

Products.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};
