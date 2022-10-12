import {
  Filter,
  FilterInput,
  addFilter,
  removeFilter,
  removeAllFilters,
} from './filter.utils';

export interface State {
  filters: Filter;
  queryURL: string;
}
export const initialState: State = {
  filters: {
    category: [],
    minPrice: [0],
    maxPrice: [100],
    country: [],
    brand: [],
    suggestedUse: [],
  },
  queryURL: '',
};

type Action =
  | { type: 'ADD_FILTER'; filter: FilterInput; filterType: string }
  | { type: 'REMOVE_FILTER'; filterName: string; filterType: string }
  | { type: 'REMOVE_ALL' };

export function filterReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_FILTER': {
      const filters = addFilter(
        state.filters,
        action.filter,
        action.filterType
      );
      return generateFinalState(state, filters);
    }
    case 'REMOVE_FILTER': {
      const filters = removeFilter(
        state.filters,
        action.filterName,
        action.filterType
      );
      return generateFinalState(state, filters);
    }
    case 'REMOVE_ALL': {
      const filters = removeAllFilters(state.filters);
      return generateFinalState(state, filters);
    }
    default:
      return state;
  }
}

const generateFinalState = (state: State, filters: Filter) => {
  generatequeryURL(state);
  return {
    ...state,
    filters: filters,
  };
};

function generatequeryURL(state: State) {
  state.queryURL = '';
  Object.entries(state.filters).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length !== 0) {
      value.forEach((v: any) => {
        if (!state.queryURL.includes(v)) {
          state.queryURL += `&${key}=${v}`;
        }
      });
    }
  });
}
