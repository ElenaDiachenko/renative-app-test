import { StyleSheet } from 'react-native';
import React from 'react';

import { MovieGallery } from '../components';

import { fetchMovies } from '../API/movieRequests';
import { useMovies } from '../hooks';

type Props = {};
const CURRENT_SCREEN = 'Home';

const HomeScreen = (props: Props) => {
  useMovies(CURRENT_SCREEN);
  return <MovieGallery prevRoute={CURRENT_SCREEN} />;
};

export default HomeScreen;

const styles = StyleSheet.create({});
