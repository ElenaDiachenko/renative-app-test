import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { palette } from '../styles';
import { useAppDispatch } from '../redux/hooks';

import { getSerializedSearchParameters } from '../utils';
import { LoginData } from '../types';
import { logIn } from '../redux/auth/operations';

type Props = {};

const HomeScreen = (props: Props) => {
  const dispatch = useAppDispatch();

  // const searchParameters = {
  //   page: 1,
  //   limit: 10,
  //   query: '',
  //   sort: 'rating',
  //   order: '1',
  // };

  const credentials: LoginData = {
    email: 'mary@gmail.com',
    password: 'mary1234',
  };
  const handleSubmit = () => {
    dispatch(logIn(credentials));
  };

  return (
    <View>
      <Text style={{ color: palette.whiteColor }}>HomeScreen</Text>
      <Button title="LogIn" onPress={handleSubmit} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
