import { StyleSheet } from 'react-native';
import React from 'react';

import { MovieGallery } from '../components';
import { useMovies } from '../hooks';

const CURRENT_SCREEN = 'Home';

const HomeScreen = () => {
  useMovies(CURRENT_SCREEN);
  return <MovieGallery prevRoute={CURRENT_SCREEN} />;
};

export default HomeScreen;

const styles = StyleSheet.create({});
