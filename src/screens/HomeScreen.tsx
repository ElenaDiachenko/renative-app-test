import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { MovieGallery } from '../components';

import { fetchMovies } from '../API/movieRequests';
import { useMovieQuery } from '../hooks';

type Props = {};

const HomeScreen = (props: Props) => {
  return <MovieGallery movieHandler={useMovieQuery} fetchData={fetchMovies} />;
};

export default HomeScreen;

const styles = StyleSheet.create({});
