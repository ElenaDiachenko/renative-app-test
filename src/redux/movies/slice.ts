import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { Movie, MovieDataType } from '../../types';
import { fetchAll, fetchById } from './operations';

export type IMovieState = {
  data: MovieDataType | null;
  isLoading: boolean;
  isError: Error | string | null;
  byId: Movie | null;
};

const initialState: IMovieState = {
  data: null,
  isLoading: false,
  isError: null,
  byId: null,
};

const fulfilledActionTypes = [fetchAll.fulfilled, fetchById.fulfilled];

const pendingActionTypes = [fetchAll.pending, fetchById.pending];

const rejectedActionTypes = [fetchAll.rejected, fetchById.rejected];

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchAll.fulfilled, (state, { payload }) => {
        state.data = payload;
      })
      .addCase(fetchById.pending, (state) => {
        state.byId = null;
      })
      .addCase(fetchById.fulfilled, (state, { payload }) => {
        state.byId = payload;
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
