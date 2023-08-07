import { useState, useEffect } from 'react';
import { FetchMoviesType } from '../API/libraryRequests';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { MovieSlice, setSearchParameters } from '../redux/filter/slice';
import { selectFilterlibrary } from '../redux/filter/selectors';
import { MovieDataType } from '../types';

export const useLibraryQuery = (fetchData: FetchMoviesType) => {
  const searchParameters = useAppSelector(selectFilterlibrary);
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
    params: Partial<MovieSlice['librarySearchParameters']>,
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

export type UseLibraryQueryType = typeof useLibraryQuery;
