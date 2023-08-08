import { StyleSheet } from 'react-native';
import React from 'react';
import { MovieGallery } from '../components';
import { useMovies } from '../hooks';

const CURRENT_SCREEN = 'Library';

const LibraryScreen = () => {
  useMovies(CURRENT_SCREEN);
  return <MovieGallery prevRoute={CURRENT_SCREEN} />;
};

export default LibraryScreen;

const styles = StyleSheet.create({});
