import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  SearchParamsType,
  fetchMovieById,
  fetchMovies,
} from '../../API/movieRequests';
import { Movie, MovieDataType } from '../../types';

export const fetchAll = createAsyncThunk<MovieDataType, SearchParamsType>(
  'movies/getAll',
  async (searchParameters: SearchParamsType, { rejectWithValue }: any) => {
    try {
      console.log(searchParameters, 'searchParameters ' + 'movies/getAll');
      const result = await fetchMovies(searchParameters);

      return result;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

export const fetchById = createAsyncThunk<Movie, string>(
  'movies/getById',
  async (id, { rejectWithValue }: any) => {
    try {
      const result = await fetchMovieById(id);
      return result;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  },
);
