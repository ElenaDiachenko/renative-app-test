import React from 'react';
// import { LoginForm } from '../components';
import { Button, Text, View } from 'react-native';
import { palette } from '../styles';
import { useAppDispatch } from '../redux/hooks';
import { LoginData } from '../types';
import { logIn } from '../redux/auth/operations';

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  // return <LoginForm />;
  const credentials: LoginData = {
    email: 'mary@gmail.com',
    password: 'mary1234',
  };
  const handleSubmit = () => {
    dispatch(logIn(credentials));
  };

  return (
    <View>
      <Text style={{ color: palette.blackColor }}>Login screen v</Text>
      <Button title="LogIn" onPress={handleSubmit} />
    </View>
  );
};

export default LoginScreen;
