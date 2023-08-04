import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import * as Screens from '../screens';
import {
  AuthStackParamList,
  DrawerParamList,
  HomeStackNavigatorParamList,
} from './types';
import { useAuth } from '../hooks';
import { DrawerMenu } from '../components';
import { useAppDispatch } from '../redux/hooks';
import { checkStatus } from '../redux/auth/operations';

const Drawer = createDrawerNavigator<DrawerParamList>();
const MainStack = createStackNavigator<HomeStackNavigatorParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();

const AuthNav = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={Screens.LoginScreen} />
      <AuthStack.Screen name="Register" component={Screens.RegisterScreen} />
    </AuthStack.Navigator>
  );
};

const DrawerNav = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <DrawerMenu {...props} />}
      screenOptions={{
        overlayColor: 'transparent',
      }}
    >
      <Drawer.Screen name="Home" component={Screens.HomeScreen} />
      <Drawer.Screen name="Library" component={Screens.LibraryScreen} />
      <Drawer.Screen name="Filters" component={Screens.FiltersScreen} />
    </Drawer.Navigator>
  );
};

const MainNav = () => (
  <MainStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <MainStack.Screen name="Main" component={DrawerNav} />
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
