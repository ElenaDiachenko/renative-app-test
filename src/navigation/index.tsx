import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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

import { headerHeight } from '../utils/constants';
import { palette } from '../styles';

const Drawer = createDrawerNavigator<DrawerParamList>();
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

const DrawerNav = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <DrawerMenu {...props} />}
      screenOptions={{
        overlayColor: 'transparent',
        drawerType: 'front',
        headerStyle: {
          height: headerHeight,
          backgroundColor: palette.mainBgColor,
          shadowColor: palette.footerBgColor,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 5,
        },
        headerTintColor: palette.whiteColor,
      }}
    >
      <Drawer.Screen name="Home" component={Screens.HomeScreen} />
      <Drawer.Screen name="Library" component={Screens.LibraryScreen} />
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
    <MainStack.Screen
      name="Video"
      component={Screens.VideoScreen}
      options={{
        orientation: 'landscape',
        presentation: 'fullScreenModal',
        animation: 'fade',
      }}
    />
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
