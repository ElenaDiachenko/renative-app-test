import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { selectLibrary } from '../library/selectors';

export const selectMovies = (state: RootState) => state.movies;

export const selectMovieById = (movieId: string, isHomeScreen: boolean) =>
  createSelector(isHomeScreen ? selectMovies : selectLibrary, (movies) => {
    const movieList = movies.data?.data;
    return movieList?.find((movie) => movie._id === movieId);
  });
