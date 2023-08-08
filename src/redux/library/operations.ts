import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {
  LibrarySearchParamsType,
  fetchMovies,
  saveMovie,
  deleteMovie,
} from '../../API/libraryRequests';
import { Movie, MovieDataType } from '../../types';
import { Alert } from 'react-native';

export const fetchAll = createAsyncThunk<
  MovieDataType,
  LibrarySearchParamsType
>(
  'library/getLibrary',
  async (
    searchParameters: LibrarySearchParamsType,
    { rejectWithValue }: any,
  ) => {
    try {
      const result = await fetchMovies(searchParameters);
      console.log(result, 'library/getLibrary');
      return result;
    } catch (error: any) {
      Alert.alert('Something went wrong. Try again later');
      return rejectWithValue(error?.response?.data);
    }
  },
);

export const addMovie = createAsyncThunk<
  {
    movie: Movie;
    limit: number;
  },
  string,
  { state: RootState; rejectWithValue: any }
>('library/addMovie', async (id, { rejectWithValue, getState }) => {
  try {
    const movie = await saveMovie(id);
    const { filter } = getState();
    const limit = filter.librarySearchParameters.limit;
    Alert.alert('The movie has been saved successfully');
    return { movie, limit };
  } catch (error: any) {
    if (error?.response?.status === 403) {
      Alert.alert(error?.response?.data?.message);
      return rejectWithValue(error?.response?.data.message);
    }
    Alert.alert('Something went wrong.Try again later');
    return rejectWithValue('Something went wrong.Try again later');
  }
});

export const removeMovie = createAsyncThunk<
  {
    movie: Movie;
    limit: number;
  },
  string,
  { state: RootState; rejectWithValue: any }
>('library/removeMovie', async (id, { rejectWithValue, getState }) => {
  try {
    const movie = await deleteMovie(id);
    const { filter } = getState();
    const limit = filter.librarySearchParameters.limit;
    Alert.alert('The movie has been deleted successfully');
    return { movie, limit };
  } catch (error: any) {
    Alert.alert('Something went wrong. Try again later');
    return rejectWithValue(error?.response?.data);
  }
});
