import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { MovieDataType } from '../../types';
import { fetchAll, addMovie, removeMovie } from './operations';

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

const fulfilledActionTypes = [
  fetchAll.fulfilled,
  addMovie.fulfilled,
  removeMovie.fulfilled,
];

const pendingActionTypes = [
  fetchAll.pending,
  addMovie.pending,
  removeMovie.pending,
];

const rejectedActionTypes = [
  fetchAll.rejected,
  addMovie.rejected,
  removeMovie.rejected,
];
export const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    resetLibraryState: () => {
      return initialState;
    },
  },
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

export const { resetLibraryState } = librarySlice.actions;

export const libraryReducer = librarySlice.reducer;

export type LibraryState = ReturnType<typeof libraryReducer>;
