import React from 'react';
import { Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { DrawerParamList, HomeDrawerScreenProps } from '../navigation/types';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAppDispatch } from '../redux/hooks';
import { logOut } from '../redux/auth/operations';
import LogoutBtn from './LogoutBtn';

import { palette } from '../styles';
import {
  DrawerContentComponentProps,
  useDrawerStatus,
} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { headerHeight } from '../utils/constants';
import { Focused } from './ui';

export const screens = {
  Home: 'Home' as keyof DrawerParamList,
  Library: 'Library' as keyof DrawerParamList,
  Filters: 'Filters' as keyof DrawerParamList,
};

const drawerRoutes = [
  {
    name: screens.Home,
    focusedRoute: screens.Home,
    title: 'Home',
    icon: (focused: boolean) => (
      <Icon
        name={focused ? 'home' : 'home-outline'}
        size={30}
        color={focused ? palette.whiteColor : palette.footerTextColor}
      />
    ),
  },
  {
    name: screens.Library,
    focusedRoute: 'Library',
    title: 'Library',
    icon: (focused: boolean) => (
      <Icon
        name={focused ? 'heart' : 'heart-outline'}
        size={30}
        color={focused ? palette.whiteColor : palette.footerTextColor}
      />
    ),
  },
  {
    name: screens.Filters,
    focusedRoute: screens.Filters,
    title: 'Filters',
    icon: (focused: boolean) => (
      <Icon
        name={focused ? 'grid' : 'grid-outline'}
        size={30}
        color={focused ? palette.whiteColor : palette.footerTextColor}
      />
    ),
  },
];

const DrawerMenu: React.FC<DrawerContentComponentProps> = ({ state }) => {
  const navigation =
    useNavigation<HomeDrawerScreenProps<'Home'>['navigation']>();

  const dispatch = useAppDispatch();
  const logoutUser = () => {
    dispatch(logOut());
  };
  const isDrawerOpen = useDrawerStatus() === 'open';

  return (
    <ScrollView style={{ flexDirection: 'column' }}>
      <LogoutBtn handlePress={logoutUser} style={styles.logoutBtn} />
      {drawerRoutes.map((route, index) => {
        const currentRoute = index === state.index;
        return (
          <Focused
            key={route.name}
            hasTVPreferredFocus={currentRoute}
            handlePress={() => navigation.navigate(route.name)}
            style={[
              styles.drawerItem,
              currentRoute ? styles.drawerItemFocused : null,
            ]}
            focusable
          >
            {route.icon(currentRoute)}
            <Text
              style={[
                styles.drawerLabel,
                currentRoute ? styles.drawerLabelFocused : null,
              ]}
            >
              {route.title}
            </Text>
          </Focused>
        );
      })}
    </ScrollView>
  );
};

export default DrawerMenu;

const styles = StyleSheet.create({
  drawerLabel: {
    fontSize: 16,
    color: palette.footerTextColor,
    marginLeft: 12,
  },
  drawerLabelFocused: {
    color: palette.whiteColor,
    fontWeight: '600',
  },
  drawerItem: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  drawerItemFocused: {
    backgroundColor: palette.accentColor,
  },
  logoutBtn: {
    height: headerHeight,
    justifyContent: 'center',
    paddingLeft: 12,
    borderBottomWidth: 1,
    borderBottomColor: palette.footerTextColor,
  },
});
