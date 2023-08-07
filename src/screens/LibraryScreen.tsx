import { StyleSheet } from 'react-native';
import React from 'react';

import { MovieGallery } from '../components';

import { fetchMovies } from '../API/libraryRequests';
import { useLibraryQuery } from '../hooks';

type Props = {};

const LibraryScreen = (props: Props) => {
  return (
    <MovieGallery
      movieHandler={useLibraryQuery}
      fetchData={fetchMovies}
      prevRoute={'Library'}
    />
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({});
