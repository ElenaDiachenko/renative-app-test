import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { palette } from '../styles';
// import { movieRequests } from '../API';
// import { useQuery } from '@tanstack/react-query';
import { getSerializedSearchParameters } from '../utils';

type Props = {};

const HomeScreen = (props: Props) => {
  const searchParameters = {
    page: 1,
    limit: 10,
    query: '',
    sort: 'rating',
    order: '1',
  };

  // const serializedSearchParameters =
  //   getSerializedSearchParameters(searchParameters);

  // const { data, isLoading, isError, isSuccess } = useQuery(
  //   ['movies', serializedSearchParameters],
  //   () => movieRequests.fetchMovies(searchParameters),
  // );

  // console.log(data, 'MOVIES');
  return (
    <View>
      <Text style={{ color: palette.whiteColor }}>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
