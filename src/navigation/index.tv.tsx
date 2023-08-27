import React, { useEffect, useState } from 'react';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import * as Screens from '../screens';
import { AuthStackParamList } from './types';
import { useAuth } from '../hooks';

import { useAppDispatch } from '../redux/hooks';
import { checkStatus } from '../redux/auth/operations';

export type HomeStackNavigatorParamList = {
  Home: undefined;
  Library: undefined;
  Details: {
    movieId: string;
    prevRoute: string;
  };
  Video: {
    uri: string;
  };
};

export type HomeStackScreenProps<T extends keyof HomeStackNavigatorParamList> =
  {
    navigation: NativeStackNavigationProp<HomeStackNavigatorParamList, T>;
    route: RouteProp<HomeStackNavigatorParamList, T>;
  };

const MainStack = createNativeStackNavigator<HomeStackNavigatorParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthNav = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Login" component={Screens.LoginScreen} />
      <AuthStack.Screen name="Register" component={Screens.RegisterScreen} />
    </AuthStack.Navigator>
  );
};

const MainNav = () => (
  <MainStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <MainStack.Screen name="Home" component={Screens.HomeScreen} />
    <MainStack.Screen name="Library" component={Screens.LibraryScreen} />
    <MainStack.Screen name="Details" component={Screens.DetailsScreen} />
    <MainStack.Screen name="Video" component={Screens.VideoScreen} />
  </MainStack.Navigator>
);

const Navigation = () => {
  const [initializing, setInitializing] = useState(true);
  const { isLoggedIn } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(checkStatus());
      setInitializing(false);
    })();
  }, []);

  if (initializing) {
    return <></>;
  }
  return (
    <NavigationContainer>
      {isLoggedIn ? <MainNav /> : <AuthNav />}
    </NavigationContainer>
  );
};

export default Navigation;
