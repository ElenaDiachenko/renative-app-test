import { RootState } from '../store';

export const selectFilterMovie = (state: RootState) =>
  state?.filter.searchParameters;

export const selectFilterlibrary = (state: RootState) =>
  state?.filter.librarySearchParameters;
