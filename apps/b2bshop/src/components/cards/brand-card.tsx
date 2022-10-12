import { useTranslation } from 'next-i18next';
import Link from '@components/ui/link';
import Image from '@components/ui/image';
import { ROUTES } from '@utils/routes';
import Heading from '@components/ui/heading';
import Text from '@components/ui/text';

type BrandsCardProps = {
  brand?: any;
};

const BrandCard: React.FC<BrandsCardProps> = ({ brand }) => {
  const { t } = useTranslation();
  const placeholderImage = `/assets/placeholder/products/product-grid.svg`;
  const { name, slug, city, logo, type_of_product, country, country_flag } =
    brand;
  return (
    <Link
      href={`${ROUTES.BRANDS}/${slug}`}
      className='relative flex cursor-pointer items-center rounded-lg bg-fill-secondary px-5 py-5 shadow-vendorCard transition-all hover:shadow-vendorCardHover'
    >
      <div className='relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden bg-fill-secondary xl:h-20 xl:w-20'>
        <Image
          alt={t('common:text-logo')}
          src={logo?.thumbnail ?? placeholderImage}
          layout='fill'
          objectFit='contain'
        />
      </div>

      <div className='flex flex-col border-l pl-5 ltr:ml-4 rtl:mr-4 xl:ltr:ml-5 xl:rtl:mr-5'>
        <Heading variant='heading' className='pb-1.5'>
          {name}
        </Heading>
        <span className='mb-1 text-fill-six'>{type_of_product}</span>
        <span className='flex items-center gap-x-2 text-fill-six'>
          <div className='relative flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden bg-fill-secondary'>
            <Image
              alt={`Brand country flag`}
              src={country_flag ?? placeholderImage}
              layout='fill'
              objectFit='contain'
            />
          </div>
          {`${city}, ${country}`}
        </span>
      </div>
    </Link>
  );
};

export default BrandCard;
