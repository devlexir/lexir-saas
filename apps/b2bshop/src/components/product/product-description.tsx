import Image from '@components/ui/image';

const ProductDescription = ({ data, item }: any) => {
  return (
    <div className='mt-8 flex flex-col '>
      <div className='flex justify-between'>
        <div className='flex gap-x-2'>
          <div>
            <Image
              src={'/assets/images/countries-flag/belgium-flag.svg'}
              alt={`Product gallery ${item.id}`}
              width={24}
              height={24}
            />
          </div>
          <div className='text-base font-bold text-brand-dark'>
            {'IZEGEM, BELGIUM'}
          </div>
        </div>

        <div className='pr-2 text-base font-bold text-brand-dark'>
          {'21% ABV'}
        </div>
      </div>
      <div className='my-2'>
        <p className='text-base text-brand-dark '>{data?.description}</p>
      </div>
    </div>
  );
};

export default ProductDescription;
