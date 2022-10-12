import { filter } from 'lodash';

export interface FilterInput {
  id: string | number;
  name: string | number;
  slug: string | number;
}

export interface Filter {
  category: string[];
  minPrice: number[] | string[];
  maxPrice: number[] | string[];
  country: string[];
  brand: string[];
  suggestedUse: string[];
}

// type FilterKeys = keyof Filter;

export function addFilter(
  filters: Filter,
  filterIn: FilterInput,
  filterType: string
) {
  if (filterType === 'maxPrice' || filterType === 'minPrice') {
    filters[filterType] = [];
  }
  if (!Object.values(filters).join(',').split(',').includes(filterIn.slug)) {
    filters[filterType]?.push(filterIn.slug);
  }

  return filters;
}

export function removeFilter(
  filters: Filter,
  filterName: string | number,
  filterType: string
) {
  if (filterType === 'maxPrice' || filterType === 'minPrice') {
    filters[filterType] = [];
  } else {
    filters[filterType] = filters[filterType].filter((v) => v !== filterName);
  }
  return filters;
}

export function removeAllFilters(filters: Filter) {
  Object.keys(filters).forEach((key) => {
    filters[key] = [];
  });
  return filters;
}
