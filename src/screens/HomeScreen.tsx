import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { palette } from '../styles';
import { useAppDispatch } from '../redux/hooks';

import { getSerializedSearchParameters } from '../utils';
import { useAuth } from '../hooks';

type Props = {};

const HomeScreen = (props: Props) => {
  // const dispatch = useAppDispatch();

  // const searchParameters = {
  //   page: 1,
  //   limit: 10,
  //   query: '',
  //   sort: 'rating',
  //   order: '1',
  // };

  return (
    <View>
      <Text style={{ color: palette.whiteColor }}>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
