import { useState, useEffect } from 'react';
import { FetchMoviesType } from '../API/libraryRequests';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { FiltersSlice, setSearchParameters } from '../redux/filter/slice';
import {
  selectFilterlibrary,
  selectFilterMovie,
} from '../redux/filter/selectors';
import { MovieDataType } from '../types';
import { fetchAll as fetchLibrary } from '../redux/library/operations';
import { fetchAll as fetchMovies } from '../redux/movies/operations';

export const useLibraryQuery = (currentScreen: string) => {
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

export type UseLibraryQueryType = typeof useLibraryQuery;
