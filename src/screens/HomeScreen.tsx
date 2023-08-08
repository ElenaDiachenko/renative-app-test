import { StyleSheet } from 'react-native';
import React from 'react';

import { MovieGallery } from '../components';

import { fetchMovies } from '../API/movieRequests';
import { useLibraryQuery } from '../hooks';

type Props = {};
const CURRENT_SCREEN = 'Home';

const HomeScreen = (props: Props) => {
  useLibraryQuery(CURRENT_SCREEN);
  return (
    <MovieGallery
      // movieHandler={useMovieQuery}
      // fetchData={fetchMovies}
      prevRoute={CURRENT_SCREEN}
    />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
