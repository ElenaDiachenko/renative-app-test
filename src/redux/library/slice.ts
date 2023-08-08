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
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchAll.fulfilled, (state, { payload }) => {
        state.data = payload;
      })
      .addCase(addMovie.fulfilled, (state, { payload }) => {
        if (state.data) {
          state.data.data.push(payload.movie);
          state.data.currentPage = Math.ceil(
            (state.data.data.length + 1) / payload.limit,
          );
          state.data.totalPages = Math.ceil(
            state.data.data.length / payload.limit,
          );
        } else {
          state.data = {
            data: [payload.movie],
            currentPage: 1,
            totalPages: 1,
          };
        }
      })
      .addCase(removeMovie.fulfilled, (state, { payload }) => {
        if (state.data) {
          const idx = state.data.data.findIndex(
            (item) => payload.movie._id === item._id,
          );
          state.data.data.splice(idx, 1);

          state.data.currentPage = Math.ceil(
            (state.data.data.length + 1) / payload.limit,
          );
          state.data.totalPages = Math.ceil(
            state.data.data.length / payload.limit,
          );
        }
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

export const libraryReducer = librarySlice.reducer;

export type LibraryState = ReturnType<typeof libraryReducer>;
