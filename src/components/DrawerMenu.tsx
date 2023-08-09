import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  Button,
} from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { DrawerParamList, HomeDrawerScreenProps } from '../navigation/types';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAppDispatch } from '../redux/hooks';
import { logOut } from '../redux/auth/operations';
import GenreList from './GenreList';
import { palette } from '../styles';
import {
  DrawerContentComponentProps,
  useDrawerStatus,
} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { genreList, headerHeight } from '../utils/constants';
import { Focused, LogoutBtn } from './ui';
import { Picker } from '@react-native-picker/picker';
import { MemoizedGenreItem } from './GenreItem';
import Search from './Search';
import ActionSection from './ActionSection';

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
        color={palette.whiteColor}
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
        color={palette.whiteColor}
      />
    ),
  },
  // {
  //   name: screens.Filters,
  //   focusedRoute: screens.Filters,
  //   title: 'Filters',
  //   icon: (focused: boolean) => (
  //     <Icon
  //       name={focused ? 'grid' : 'grid-outline'}
  //       size={30}
  //       color={focused ? palette.whiteColor : palette.footerTextColor}
  //     />
  //   ),
  // },
];

const DrawerMenu: React.FC<DrawerContentComponentProps> = ({
  state,
  navigation,
}) => {
  // const navigation =
  //   useNavigation<HomeDrawerScreenProps<'Home'>['navigation']>();

  const dispatch = useAppDispatch();
  const logoutUser = () => {
    dispatch(logOut());
  };
  const isDrawerOpen = useDrawerStatus() === 'open';
  const closeDrawerMenu = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  return (
    <View
      style={{
        flexDirection: 'column',
        flex: 1,
        backgroundColor: palette.mainBgColor,
      }}
    >
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

      <ActionSection closeDrawerMenu={closeDrawerMenu} />
    </View>
  );
};

export default DrawerMenu;

const styles = StyleSheet.create({
  drawerLabel: {
    fontSize: 18,
    color: palette.whiteColor,
    marginLeft: 12,
  },
  drawerLabelFocused: {
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
