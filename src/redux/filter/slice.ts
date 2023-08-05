import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type MovieSlice = {
  searchParameters: {
    page: number;
    limit: number;
    query: string;
    sort: string;
    order: string;
  };
  librarySearchParameters: {
    page: number;
    limit: number;
    query: string;
    sort: string;
    order: string;
  };
};

export const initialState: MovieSlice = {
  searchParameters: {
    page: 1,
    limit: 12,
    query: '',
    sort: 'rating',
    order: '1',
  },
  librarySearchParameters: {
    page: 1,
    limit: 12,
    query: '',
    sort: 'rating',
    order: '1',
  },
};

const filterSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setSearchParameters: (
      state,
      action: PayloadAction<Partial<MovieSlice['searchParameters']>>,
    ) => {
      state.searchParameters = {
        ...state.searchParameters,
        ...action.payload,
      };
    },
    setLibrarySearchParameters: (
      state,
      action: PayloadAction<Partial<MovieSlice['librarySearchParameters']>>,
    ) => {
      state.librarySearchParameters = {
        ...state.librarySearchParameters,
        ...action.payload,
      };
    },
  },
});

export const { setSearchParameters, setLibrarySearchParameters } =
  filterSlice.actions;

export const filterReducer = filterSlice.reducer;
