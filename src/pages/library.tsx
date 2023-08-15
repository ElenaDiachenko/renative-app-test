import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import MovieGallery from '../components/movieGallery/index.web';

import { useAppSelector } from '../redux/hooks';
import { selectFilterlibrary } from '../redux/filter/selectors';
import { useMovies } from '../hooks/useMovies.web';

const Library: NextPage = () => {
  const router = useRouter();
  const searchParameters = useAppSelector(selectFilterlibrary);
  const { data, isLoading, isError, changeSearchParams } = useMovies();

  useEffect(() => {
    if (router.isReady) {
      const newQuery = {
        page: searchParameters.page.toString(),
        limit: searchParameters.limit.toString(),
        ...(searchParameters.query && { query: searchParameters.query }),
        ...(searchParameters.sort && { sort: searchParameters.sort }),
        ...(searchParameters.order && { order: searchParameters.order }),
      };

      router.replace({
        pathname: router.pathname,
        query: newQuery,
      });
    }
  }, [router.isReady]);

  return data && <MovieGallery prevRoute={'Library'} data={data} />;
};

export default Library;
