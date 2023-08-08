import { createAsyncThunk } from '@reduxjs/toolkit';
import { SearchParamsType, fetchMovies } from '../../API/movieRequests';
import { MovieDataType } from '../../types';

export const fetchAll = createAsyncThunk<MovieDataType, SearchParamsType>(
  'movies/getAll',
  async (searchParameters: SearchParamsType, { rejectWithValue }: any) => {
    try {
      const result = await fetchMovies(searchParameters);

      return result;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  },
);
