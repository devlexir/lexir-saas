import { CountryOriginFilter } from '@components/search/Filters/CountryOriginFilter';
import { FilterProvider } from '@contexts/filter/filter.context';
import { ComponentMeta } from '@storybook/react';

export default {
  title: 'Molecules/Filters/CountryOriginFilter',
  component: CountryOriginFilter,
} as ComponentMeta<typeof CountryOriginFilter>;

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

export const Primary = () => (
  <FilterProvider>
    <CountryOriginFilter countries={countries} />
  </FilterProvider>
);
