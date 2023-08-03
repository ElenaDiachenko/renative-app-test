import React from 'react';
import { LoginForm } from '../components';
import { Text, View } from 'react-native';
import { palette } from '../styles';

const LoginScreen = () => {
  // return <LoginForm />;
  return (
    <View>
      <Text style={{ color: palette.blackColor }}>Login screen v</Text>
    </View>
  );
};

export default LoginScreen;
