import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import MovieGallery from '../components/movieGallery/index.web';

import { useAppSelector } from '../redux/hooks';
import { selectFilterlibrary } from '../redux/filter/selectors';
import { useMovies } from '../hooks/useMovies.web';
import { Meta } from '../components/ui';

const Library: NextPage = () => {
  const router = useRouter();

  const searchParameters = useAppSelector(selectFilterlibrary);
  const { data, isLoading, isError } = useMovies();

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
  }, [router.isReady, searchParameters]);

  return (
    <Meta title="Library page" description="Library page">
      {data && <MovieGallery prevRoute={'Library'} data={data} />}
    </Meta>
  );
};

export default Library;
