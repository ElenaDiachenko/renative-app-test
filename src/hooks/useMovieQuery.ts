import { useState, useEffect } from 'react';
import { FetchMoviesType } from '../API/movieRequests';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectFilterMovie } from '../redux/filter/selectors';
import { MovieSlice, setSearchParameters } from '../redux/filter/slice';
import { MovieDataType } from '../types';

export const useMovieQuery = (fetchData: FetchMoviesType) => {
  const searchParameters = useAppSelector(selectFilterMovie);
  const dispatch = useAppDispatch();
  const [data, setData] = useState<MovieDataType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const result = await fetchData(searchParameters);
        if (result) setData(result);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [searchParameters]);

  const changeSearchParams = (
    params: Partial<MovieSlice['searchParameters']>,
  ) => {
    dispatch(setSearchParameters(params));
  };

  return {
    data,
    isLoading,
    isError,
    changeSearchParams,
  };
};

export type UseMovieQueryType = typeof useMovieQuery;
