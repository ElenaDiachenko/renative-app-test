import { MovieDataType, Movie } from '../types';
import $api from './instance';

export type SearchParamsType = {
  page: number;
  limit: number;
  query: string;
  sort: string;
  order: string;
};

export const fetchMovies = async (searchParams: SearchParamsType) => {
  const { page, limit, query, sort, order } = searchParams;

  let queryParams = `page=${page}&limit=${limit}`;
  if (query) {
    queryParams += `&query=${encodeURIComponent(query)}`;
  }
  if (sort && order) {
    queryParams += `&sort=${encodeURIComponent(sort)},${encodeURIComponent(
      order,
    )}`;
  }

  const response = await $api.get<MovieDataType>(`/movies?${queryParams}`);
  return response.data;
};

export const fetchMovieById = async (id: string) => {
  if (!id) return;
  const { data } = await $api.get<{ data: Movie }>(`/movies/${id}`);

  return data.data;
};

export type FetchMoviesType = typeof fetchMovies;
