import {
  FiltersSlice,
  setSearchParameters,
  setLibrarySearchParameters,
} from '../redux/filter/slice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

import { selectLibrary } from '../redux/library/selectors';
import { selectMovies } from '../redux/movies/selectors';

export const useLibraryState = (route: string) => {
  const isHomeScreen = route === 'Home';
  const { data, isLoading, isError } = useAppSelector(
    isHomeScreen ? selectMovies : selectLibrary,
  );
  const dispatch = useAppDispatch();

  const changeSearchParams = (
    params: Partial<
      FiltersSlice['searchParameters'] | FiltersSlice['librarySearchParameters']
    >,
  ) => {
    dispatch(
      isHomeScreen
        ? setSearchParameters(params)
        : setLibrarySearchParameters(params),
    );
  };

  return { data, isLoading, isError, changeSearchParams };
};
