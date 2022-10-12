import BrandCard from '@components/cards/brand-card';
import Alert from '@components/ui/alert';
import Heading from '@components/ui/heading';
import { useShopsQuery } from '@framework/basic-rest/shop/get-shops';

const BrandsPageContent: React.FC = () => {
  const { data, error } = useShopsQuery({
    limit: 9,
  });

  if (error) return <Alert message={error?.message} />;

  return (
    <div className='px-4 pt-10 pb-14 md:px-8 lg:pt-12 lg:pb-16 xl:pt-14 xl:pb-20'>
      <div className='mx-auto w-full xl:max-w-[1490px]'>
        <Heading variant='collectionHeading' className='mb-6 lg:mb-10'>
          {'All Brands'}
        </Heading>
        <div className='grid gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-5 xl:gap-6'>
          {data?.shop?.data?.map((item) => (
            <BrandCard key={item.id} brand={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandsPageContent;
