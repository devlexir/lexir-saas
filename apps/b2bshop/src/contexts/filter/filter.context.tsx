import { filterReducer, State, initialState } from './filter.reducer';
import { FilterInput } from './filter.utils';
import { useLocalStorage } from '@utils/use-local-storage';
import * as React from 'react';

interface FilterProviderState extends State {
  addFilter: (filter: FilterInput, filterType: string) => void;
  removeFilter: (filterName: string, filterType: string) => void;
  removeAllFilters: () => void;
}

export const filterContext = React.createContext<
  FilterProviderState | undefined
>(undefined);

filterContext.displayName = 'FilterContext';

export const useFilter = () => {
  const context = React.useContext(filterContext);
  if (context === undefined) {
    throw new Error(`useFilter must be used within a FilterProvider`);
  }
  return context;
};

export const FilterProvider = (props: any) => {
  const [savedFilter, saveFilter] = useLocalStorage(
    `filters`,
    JSON.stringify(initialState)
  );

  const [state, dispatch] = React.useReducer(
    filterReducer,
    JSON.parse(savedFilter!)
  );

  React.useEffect(() => {
    saveFilter(JSON.stringify(state));
  }, [state, saveFilter]);

  const addFilter = (filter: FilterInput, filterType: string) =>
    dispatch({ type: 'ADD_FILTER', filter, filterType });
  const removeFilter = (filterName: string, filterType: string) =>
    dispatch({ type: 'REMOVE_FILTER', filterName, filterType });

  const removeAllFilters = () => dispatch({ type: 'REMOVE_ALL' });

  const value = React.useMemo(
    () => ({
      ...state,
      addFilter,
      removeFilter,
      removeAllFilters,
    }),
    [state]
  );
  return <filterContext.Provider value={value} {...props} />;
};
