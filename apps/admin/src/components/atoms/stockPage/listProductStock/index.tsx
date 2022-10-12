import CardProduct from './cardProduct';

const ProductList = ({ products, totalStock }: any) => {
  return (
    <>
      <div className='lg:mt-6 lg:px-4'>
        <div className='bg-white lg:mt-6'>
          <span className='mb-2 flex w-full justify-end rounded-t-lg border  border-[#E7E7E7] px-4 py-6 font-semibold text-[#2D2D2D]'>{`${totalStock} (un)`}</span>

          {products?.map((product: any) => (
            <CardProduct
              productName={product.name}
              inStock={product.available_stock}
              totalStock={totalStock}
              lastTopUp={product.qty_last_top_up_amount}
              date={product.date_last_top_up_amount}
              status={'Plenty of Stock'}
              available_percentage={product.available_percentage}
              imageSRC={product.imageSRC}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;
