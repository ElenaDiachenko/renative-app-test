import { Movie, MovieDataType } from '../types';
import $api from './instance';

export type LibrarySearchParamsType = {
  page: number;
  limit: number;
  query: string;
  sort: string;
  order: string;
};

export const fetchMovies = async (searchParams: LibrarySearchParamsType) => {
  const { page, limit, query } = searchParams;

  let queryParams = `page=${page}&limit=${limit}`;
  if (query) {
    queryParams += `&query=${encodeURIComponent(query)}`;
  }

  const response = await $api.get<MovieDataType>(`/library?${queryParams}`);
  return response.data;
};

export const saveMovie = async (id: string) => {
  const { data } = await $api.post<Movie>(`/library/${id}`);
  return data;
};

export const deleteMovie = async (id: string) => {
  const { data } = await $api.delete<Movie>(`/library/${id}`);
  return data;
};

export type FetchMoviesType = typeof fetchMovies;
