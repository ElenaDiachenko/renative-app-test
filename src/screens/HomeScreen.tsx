import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { palette } from '../styles';
import { useAppDispatch } from '../redux/hooks';
import { MovieGallery } from '../components';
import { movieRequests } from '../API';
import { fetchMovies } from '../API/movieRequests';
import { useMovieQuery } from '../hooks';

type Props = {};

const HomeScreen = (props: Props) => {
  console.log(movieRequests);
  // const searchParameters = {
  //   page: 1,
  //   limit: 10,
  //   query: '',
  //   sort: 'rating',
  //   order: '1',
  // };

  return (
    // <View></View>
    <MovieGallery movieHandler={useMovieQuery} fetchData={fetchMovies} />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
