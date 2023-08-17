import { createAsyncThunk } from '@reduxjs/toolkit';
import { Alert } from 'react-native';
import { toast } from 'react-toastify';
import { isWebBased } from '@rnv/renative';
import { RootState } from '..';
import {
  LibrarySearchParamsType,
  fetchMovies,
  saveMovie,
  deleteMovie,
} from '../../API/libraryRequests';
import { Movie, MovieDataType } from '../../types';

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

      return result;
    } catch (error: any) {
      isWebBased
        ? toast.error('Something went wrong. Try again later')
        : Alert.alert('Something went wrong. Try again later');
      console.log(error, 'library/getLibrary');
      return rejectWithValue(error?.response?.data);
    }
  },
);

export const addMovie = createAsyncThunk<
  Movie,
  string,
  { state: RootState; rejectWithValue: any }
>('library/addMovie', async (id, { rejectWithValue, getState, dispatch }) => {
  try {
    const movie = await saveMovie(id);
    const { filter } = getState();

    const librarySearchParameters = filter.librarySearchParameters;
    await dispatch(fetchAll(librarySearchParameters));
    isWebBased
      ? toast.success('The movie has been saved successfully')
      : Alert.alert('The movie has been saved successfully');
    return movie;
  } catch (error: any) {
    if (error?.response?.status === 403) {
      isWebBased
        ? toast.error(error?.response?.data?.message)
        : Alert.alert(error?.response?.data?.message);
      return rejectWithValue(error?.response?.data.message);
    }
    isWebBased
      ? toast.info('Something went wrong. Try again later')
      : Alert.alert('Something went wrong.Try again later');
    return rejectWithValue('Something went wrong.Try again later');
  }
});

export const removeMovie = createAsyncThunk<
  Movie,
  string,
  { state: RootState; rejectWithValue: any }
>(
  'library/removeMovie',
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const movie = await deleteMovie(id);
      const { filter } = getState();

      const librarySearchParameters = filter.librarySearchParameters;
      await dispatch(fetchAll(librarySearchParameters));

      isWebBased
        ? toast.info('The movie has been deleted successfully')
        : Alert.alert('The movie has been deleted successfully');
      return movie;
    } catch (error: any) {
      isWebBased
        ? toast.error('Something went wrong. Try again later')
        : Alert.alert('Something went wrong.Try again later');
      return rejectWithValue(error?.response?.data);
    }
  },
);
