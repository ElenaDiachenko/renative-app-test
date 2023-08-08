import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import {
  selectFilterlibrary,
  selectFilterMovie,
} from '../redux/filter/selectors';
import { fetchAll as fetchLibrary } from '../redux/library/operations';
import { fetchAll as fetchMovies } from '../redux/movies/operations';

export const useMovies = (currentScreen: string) => {
  const isHomeScreen = currentScreen === 'Home';
  const selector = isHomeScreen ? selectFilterMovie : selectFilterlibrary;
  const searchParameters = useAppSelector(selector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      isHomeScreen
        ? fetchMovies(searchParameters)
        : fetchLibrary(searchParameters),
    );
  }, [currentScreen, searchParameters]);
};
