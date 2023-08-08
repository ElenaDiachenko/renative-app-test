import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { MovieDataType } from '../../types';
import { fetchAll } from './operations';

export type IMovieState = {
  data: MovieDataType | null;
  isLoading: boolean;
  isError: Error | string | null;
};

const initialState: IMovieState = {
  data: null,
  isLoading: false,
  isError: null,
};

const fulfilledActionTypes = [fetchAll.fulfilled];

const pendingActionTypes = [fetchAll.pending];

const rejectedActionTypes = [fetchAll.rejected];

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchAll.fulfilled, (state, { payload }) => {
        state.data = payload;
      })
      .addMatcher(isAnyOf(...fulfilledActionTypes), (state) => {
        state.isLoading = false;
        state.isError = null;
      })
      .addMatcher(isAnyOf(...pendingActionTypes), (state) => {
        state.isLoading = true;
      })
      .addMatcher(
        isAnyOf(...rejectedActionTypes),
        (state, { payload }: { payload: any }) => {
          state.isError = payload;
        },
      ),
});

export const movieReducer = movieSlice.reducer;
export type MoviesState = ReturnType<typeof movieReducer>;
