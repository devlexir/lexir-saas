import GpsIcon from '@components/icons/gpsIcon';
import PackageIcon from '@components/icons/packageIcon';
import ProductCard from '@components/product/product-cards/product-card';
import Heading from '@components/ui/heading';

export function BrandsSingleDetails({ brandData, products }: any) {
  return (
    <div className='flex flex-col md:flex-row justify-center my-10'>
      <article
        className={
          'w-12/12 lg:w-4/12 inline-block mx-auto md:mx-0 mb-0 md:mb-10 px-8 text-center md:text-left '
        }
      >
        <div className={'flex flex-col justify-center px-8 border '}>
          <div className='lg:mx-6 xl:mx-12 my-10'></div>
          <div className='flex flex-col mx-auto'>
            <Heading
              variant='titleMedium'
              className='font-source_serif_pro ml-0 mb-3 text-black font-bold text-3xl text-left'
            >
              {brandData?.fullName}
            </Heading>
            <p className={'ml-0'}>{brandData?.description}</p>
            <button className={'mt-10 mb-5 text-brand'}>Read More</button>
          </div>
          <div className='flex'>
            <div className='flex flex-grow md:justify-start items-center'>
              <div className='flex items-center justify-center w-12 h-full'>
                <GpsIcon />
              </div>
              <div className='font-normal'>
                <span className={'text-sm text-black'}>Location</span>
                <p className={''}>{brandData?.location}</p>
              </div>
            </div>
          </div>
          <div className='flex mt-3'>
            <div className='flex flex-grow md:justify-start items-center '>
              <div className='flex items-center justify-center w-12 h-full'>
                <PackageIcon />
              </div>
              <div className='mt-3 font-normal'>
                <span className={'block text-sm text-black'}>Product Type</span>

                {brandData?.categories.map((category: any) => {
                  return (
                    <div
                      className={
                        'inline-block py-1 text-sm bg-slate-100 mr-2 text-center px-3 mt-2 mb-2'
                      }
                      key={category}
                    >
                      {category}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </article>

      <section className={'w-full lg:w-8/12 inline-block mt-10 md:mt-0 mr-8'}>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6'>
          {products?.map((product: any) => {
            return (
              <ProductCard
                key={`product--key-${product.id}`}
                product={product}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
