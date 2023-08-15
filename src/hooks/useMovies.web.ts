import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { selectFilterlibrary } from '../redux/filter/selectors';
import { fetchAll as fetchLibrary } from '../redux/library/operations';
import { selectLibrary } from '../redux/library/selectors';
import {
  FiltersSlice,
  setLibrarySearchParameters,
} from '../redux/filter/slice';

export const useMovies = () => {
  const searchParameters = useAppSelector(selectFilterlibrary);
  const dispatch = useAppDispatch();
  const { data, isLoading, isError } = useAppSelector(selectLibrary);
  useEffect(() => {
    dispatch(fetchLibrary(searchParameters));
  }, [searchParameters]);

  const changeSearchParams = (
    params: Partial<FiltersSlice['librarySearchParameters']>,
  ) => {
    dispatch(setLibrarySearchParameters(params));
  };
  return { data, isLoading, isError, changeSearchParams };
};
