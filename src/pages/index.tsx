import React, { useEffect } from 'react';
import type {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';

import { useRouter } from 'next/router';
import { fetchMovies } from '../API/movieRequests';
import { useAuth } from '../hooks';
import MovieGallery from '../components/movieGallery/index.web';

import { MovieDataType } from '../types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectFilterMovie } from '../redux/filter/selectors';
import { checkStatus } from '../redux/auth/operations';

const Home: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ data }) => {
  const router = useRouter();
  const searchParameters = useAppSelector(selectFilterMovie);
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn, 'isLoggedIn');
  useEffect(() => {
    (async () => {
      await dispatch(checkStatus());
    })();
  }, []);

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
    <>
      <MovieGallery prevRoute={'Home'} data={data} />
    </>
  );
};

export default Home;

type PropsType = { data: MovieDataType };

export const getServerSideProps: GetServerSideProps<PropsType> = async (
  context: GetServerSidePropsContext,
) => {
  const { query } = context;

  const searchParameters = {
    page: Number(query.page) || 1,
    limit: Number(query.limit) || 5,
    query: (query.query as string) || '',
    sort: (query.sort as string) || '',
    order: (query.order as string) || '',
  };

  const data = await fetchMovies(searchParameters);

  return {
    props: {
      data,
    },
  };
};
