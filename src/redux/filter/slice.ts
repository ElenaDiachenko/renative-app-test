import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FiltersSlice = {
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

export const initialState: FiltersSlice = {
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
      action: PayloadAction<Partial<FiltersSlice['searchParameters']>>,
    ) => {
      state.searchParameters = {
        ...state.searchParameters,
        ...action.payload,
      };
    },
    setLibrarySearchParameters: (
      state,
      action: PayloadAction<Partial<FiltersSlice['librarySearchParameters']>>,
    ) => {
      state.librarySearchParameters = {
        ...state.librarySearchParameters,
        ...action.payload,
      };
    },
    resetFilterState: (state) => {
      state.searchParameters = initialState.searchParameters;
      state.librarySearchParameters = initialState.librarySearchParameters;
    },
  },
});

export const {
  setSearchParameters,
  setLibrarySearchParameters,
  resetFilterState,
} = filterSlice.actions;

export const filterReducer = filterSlice.reducer;
export type FilterState = ReturnType<typeof filterReducer>;
