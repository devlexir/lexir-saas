import { useEffect, useState } from 'react';

import type { GetServerSideProps } from 'next';

import { useAtom } from 'jotai';

import PageHeader from '@components/atoms/pageHeader';
import Layout from '@components/layouts/admin';
import EmptyProduct from '@components/product/components/empty-product';
import ProductCard from '@components/product/components/product-card';
import ProductList from '@components/product/table/product-list';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';

import {
  getAuthCredentials,
  superAdminAndAdminAndBrandOnly,
} from '@utils/auth-utils';
import { getSubdomain } from '@utils/request-utils';

import { productDelete } from '@contexts/delete_obsever';
import {
  brandFilterProductsAtom,
  categoryFilterProductsAtom,
  productNameFilterProductsAtom,
} from '@contexts/filters';
import { useProductsQuery } from '@data/product/products.query';
import { SortOrder } from '@ts-types/generated';

export default function ProductsPage() {
  const { subdomain: subdomain } = getSubdomain();

  const [searchTerm, setSearchTerm] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState('created_at');
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);

  // ** States for Fitlers ** //
  const [brandFilterProducts] = useAtom(brandFilterProductsAtom);
  const [productNameFilterProducts] = useAtom(productNameFilterProductsAtom);
  const [categoryFilterProducts] = useAtom(categoryFilterProductsAtom);

  const {
    refetch,
    data,
    isLoading: loading,
    error,
  } = useProductsQuery({
    subdomain: subdomain,
    limit: 20,
    page,
    type,
    category,
    text: searchTerm,
    orderBy,
    sortedBy,
    brandFilterProducts: brandFilterProducts,
    categoryFilterProducts: categoryFilterProducts,
    productNameFilterProducts: productNameFilterProducts,
    skuFilterProducts: productNameFilterProducts,
  });
  // ** State for delete product obsever ** //
  const [isDeleted] = useAtom(productDelete);

  // ** Effect for delete product obsever. This function makes a refresh of the ** //
  // ** useProductsQuery after deletion of a product ** //
  useEffect(() => {
    refetch();
  }, [isDeleted]);

  if (loading) return <Loader text='Loading' />;
  if (error) return <ErrorMessage message={error.message} />;

  function handlePagination(current: any) {
    setPage(current);
  }

  return (
    <>
      <div className='mb-4 bg-[#F9F9F9] lg:sticky lg:top-[72px] lg:z-[30] lg:w-full lg:border-b-2 lg:border-l-2 lg:border-gray-100 lg:px-4'>
        <PageHeader
          title='Products'
          subtitle={`Manage your brand's products and prices`}
          datepicker={false}
          addButton={{ title: '+ New Product', href: '/products/create' }}
        />
      </div>
      <div className='lg:mt-6 lg:px-4'>
        {data.products.data.length > 0 ? (
          <>
            <div className='hidden md:block'>
              <ProductList
                products={data?.products}
                onPagination={handlePagination}
                onOrder={setOrder}
                onSort={setColumn}
                title='Product List'
              />
            </div>
            <div className='block lg:hidden'>
              <div className='flex space-x-5'>
                <div className='grid w-full grid-cols-1'>
                  <div className='block md:hidden '>
                    {data?.products?.data.map((product: any) => (
                      <ProductCard item={product} key={product.id} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <EmptyProduct />
        )}
      </div>
    </>
  );
}

ProductsPage.authenticate = {
  permissions: superAdminAndAdminAndBrandOnly,
};

ProductsPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;

  const { permissions } = getAuthCredentials(context);

  return {
    props: {
      subdomain: query.site,
      userPermissions: permissions,
    },
  };
};
