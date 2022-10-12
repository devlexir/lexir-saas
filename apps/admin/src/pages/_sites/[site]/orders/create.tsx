/* General Atoms */
import { useState } from 'react';

import type { GetServerSideProps } from 'next';

import PageHeader from '@components/atoms/pageHeader';
import Cart from '@components/cart/cart';
import CartCounterButton from '@components/cart/cart-counter-button';
import { Card } from '@components/common/card';
import Layout from '@components/layouts/admin';
import ProductList from '@components/order/components/orderStep1/table/product-list';
import { ProductsStep2 } from '@components/order/productsStep2';
import ProductsStep3 from '@components/order/productsStep3';
import CategoryTypeFilter from '@components/product/components/category-type-filter';
import ProductCard from '@components/product/components/digital-card';
import Drawer from '@components/ui/drawer';
import DrawerWrapper from '@components/ui/drawer-wrapper';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import NotFound from '@components/ui/not-found';

import { getAuthCredentials } from '@utils/auth-utils';
import { superAdminOnly } from '@utils/auth-utils';
import { getSubdomain } from '@utils/request-utils';

import { useUI } from '@contexts/ui.context';
import { useProductsQuery } from '@data/product/products.query';
import { Product } from '@ts-types/generated';
import { SortOrder } from '@ts-types/generated';
import cn from 'classnames';

export default function ProductsPage(pageProps: any) {
  const [step, setStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const [orderBy, setOrder] = useState('');
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);

  const { displayCartSidebar, closeCartSidebar } = useUI();

  const { subdomain: subdomain } = getSubdomain();

  const {
    data,
    isLoading: loading,
    error,
  } = useProductsQuery({
    subdomain: subdomain,
    limit: 18,
    text: searchTerm,
    page,
    type,
    category,
  });

  if (loading) return <Loader text='Loading' />;
  if (error) return <ErrorMessage message={error.message} />;

  function handlePagination(current: any) {
    setPage(current);
  }

  const { products } = data;

  return (
    <>
      {/* Page Header Section */}
      <div className='mb-4 bg-[#F9F9F9] lg:sticky lg:top-[72px] lg:z-[30] lg:w-full lg:border-b-2 lg:border-l-2 lg:border-gray-100 lg:px-4'>
        <PageHeader
          title='Orders'
          subtitle='Add new order'
          datepicker={false}
          addButton={false}
        />
      </div>
      {/* Steps Section */}

      {step === 1 ? (
        <>
          <ProductsStep
            data={data}
            handlePagination={handlePagination}
            setOrder={setOrder}
            setColumn={setColumn}
            setStep={setStep}
            products={products}
          />
        </>
      ) : null}

      {step === 2 ? (
        <ProductsStep2 setStep={setStep} subdomain={pageProps.subdomain} />
      ) : null}

      {step === 3 ? (
        <ProductsStep3 setStep={setStep} subdomain={pageProps.subdomain} />
      ) : null}

      <Card className='mb-8 flex flex-col'>
        <div
          className={cn('flex w-full transition', {
            'visible h-auto': visible,
            'invisible h-0': !visible,
          })}
        >
          <div className='mt-5 flex w-full flex-col border-t border-gray-200 pt-5 md:mt-8 md:flex-row md:items-center md:pt-8'>
            <CategoryTypeFilter
              onCategoryFilter={({ slug }: { slug: string }) => {
                setCategory(slug);
                setPage(1);
              }}
              onTypeFilter={({ slug }: { slug: string }) => {
                setType(slug);
                setPage(1);
              }}
              className='w-full'
            />
          </div>
        </div>
      </Card>

      {/* <Card> */}

      {!products?.data?.length ? (
        <NotFound text='text-not-found' className='mx-auto w-7/12' />
      ) : null}

      {/* Mobile cart Drawer */}
      <CartCounterButton />
      <Drawer
        open={displayCartSidebar}
        onClose={closeCartSidebar}
        variant='right'
      >
        <DrawerWrapper hideTopBar={true}>
          <Cart />
        </DrawerWrapper>
      </Drawer>
    </>
  );
}

export const ProductsStep = ({
  data,
  handlePagination,
  setOrder,
  setColumn,
  products,
}: any) => {
  return (
    <>
      {/* Table Section (Desktop) */}
      <div className='lg:mt-6 lg:px-4'>
        <div className='hidden lg:block'>
          <ProductList
            products={data?.products}
            onPagination={handlePagination}
            onOrder={setOrder}
            onSort={setColumn}
          />
        </div>

        {/* Product Cards Section (Mobile and Tablet) */}
        <div className='block lg:hidden'>
          <div className='flex space-x-5'>
            <div className='grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] 2xl:gap-5'>
              {products?.data?.map((product: Product) => (
                <ProductCard key={product.id} item={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ProductsPage.authenticate = {
  permissions: superAdminOnly,
};

ProductsPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx;

  const { permissions } = getAuthCredentials(ctx);

  return {
    props: {
      subdomain: query.site,
      userPermissions: permissions,
    },
  };
};
