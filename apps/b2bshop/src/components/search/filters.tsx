import { BrandsFilter } from './Filters/BrandsFilter';
import { CategoryFilter } from './Filters/CategoryFilter';
import { CountryOriginFilter } from './Filters/CountryOriginFilter';
import { PriceFilter } from './Filters/PriceFilter';
import { SuggestedUseFilter } from './Filters/SuggestedUseFilter';
import { FilteredItem } from './filtered-item';
import Heading from '@components/ui/heading';
import { useFilter } from '@contexts/filter/filter.context';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const flagBlegiumSvg = (
  <svg
    width='36'
    height='25'
    viewBox='0 0 36 25'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M12.3501 0.5H23.4101V24.5H12.3501V0.5Z' fill='#FFC107' />
    <path d='M23.4099 0.5H35.2599V24.5H23.4099V0.5Z' fill='#FF3D00' />
    <path d='M0.5 0.5H12.35V24.5H0.5V0.5Z' fill='#455A64' />
  </svg>
);

const flagEnglandSvg = (
  <svg
    width='36'
    height='25'
    viewBox='0 0 36 25'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M0.5 0.5H35.26V24.5H0.5V0.5Z' fill='#ECEFF1' />
    <path d='M0.5 10.0996H35.26V14.8996H0.5V10.0996Z' fill='#E53935' />
    <path d='M15.51 0.5H20.25V24.5H15.51V0.5Z' fill='#E53935' />
  </svg>
);

export const ShopFilters = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const { filters, queryURL, removeAllFilters } = useFilter();

  const [hasFilters, sethasFilters] = useState(false);

  useEffect(() => {
    sethasFilters(queryURL === '' ? false : true);
  });

  const categories = [
    {
      id: 1,
      slug: 'gin',
      name: 'Gin',
    },
    {
      id: 2,
      slug: 'rum',
      name: 'Rum',
    },
    {
      id: 3,
      slug: 'vermouth',
      name: 'Vermouth',
    },
  ];
  const countries = [
    {
      id: 4,
      slug: 'belgium',
      name: 'Belgium',
      icon: flagBlegiumSvg,
    },
    {
      id: 5,
      slug: 'england',
      name: 'England',
      icon: flagEnglandSvg,
    },
    {
      id: 6,
      slug: 'denmark',
      name: 'Denmark',

      icon: flagEnglandSvg,
    },
    {
      id: 7,
      slug: 'france',
      name: 'France',
      icon: flagBlegiumSvg,
    },
  ];

  return (
    <div className='space-y-10'>
      {hasFilters && (
        <div className='-mb-3 block'>
          <div className='mb-4 -mt-1 flex items-center justify-between'>
            <Heading>{t('Filters')}</Heading>
            <button
              className='flex-shrink text-13px transition duration-150 ease-in hover:text-brand-dark focus:outline-none'
              aria-label={t('text-clear-all')}
              onClick={removeAllFilters}
            >
              {t('Clear All')}
            </button>
          </div>
          <div className='-m-1 flex flex-wrap'>
            {Object.values(filters)
              .join(',')
              .split(',')
              .map(
                (v, idx) =>
                  !isEmpty(v) && (
                    <FilteredItem
                      itemKey={
                        Object.keys(filters).find((k) =>
                          filters[k]?.includes(v)
                        )!
                      }
                      itemValue={v}
                      key={idx}
                    />
                  )
              )}
          </div>
        </div>
      )}
      <CategoryFilter categories={categories} />
      <PriceFilter />
      <CountryOriginFilter countries={countries} />
      <BrandsFilter />
      <SuggestedUseFilter />
    </div>
  );
};
