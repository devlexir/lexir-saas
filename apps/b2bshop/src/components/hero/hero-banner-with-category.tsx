import CategoryListCard from '@components/cards/category-list-card';
import BannerAllCarousel from '@components/common/banner-all-carousel';
import BannerGridTwo from '@components/common/banner-grid-two';
import { useCategoriesQuery } from '@framework/basic-rest/category/get-all-categories';
import { bannerGridMediumTwo as bannersMedium } from '@framework/basic-rest/static/banner';
import { bannerDiscount } from '@framework/basic-rest/static/banner';
import { LIMITS } from '@framework/basic-rest/utils/limits';
import { ROUTES } from '@utils/routes';

interface Props {
  className?: string;
}

const HeroBannerWithCategory: React.FC<Props> = ({
  className = 'mb-12 lg:mb-14 xl:mb-16 2xl:mb-20',
}) => {
  const { data } = useCategoriesQuery({
    limit: LIMITS.CATEGORIES_LIMITS,
  });
  return (
    <div className={`xl:flex md:pb-2.5 ${className}`}>
      <div className='hidden xl:block shrink-0 ltr:pr-8 rtl:pl-8 xl:w-[320px] 2xl:w-[370px] pt-px'>
        <div className='flex flex-col justify-between h-full border rounded-md border-border-base'>
          {data?.categories?.data?.slice(0, 10)?.map((category) => (
            <CategoryListCard
              key={`category--key-${category.id}`}
              category={category}
              href={{
                pathname: ROUTES.SEARCH,
                query: { category: category.slug },
              }}
              className='transition border-b border-border-base last:border-b-0'
              variant='small'
            />
          ))}
        </div>
      </div>
      <div className='w-full trendy-main-content'>
        <BannerGridTwo data={bannersMedium} />
        <BannerAllCarousel
          data={bannerDiscount}
          buttonSize='small'
          className='mb-0'
        />
      </div>
    </div>
  );
};

export default HeroBannerWithCategory;
