import React, { useEffect, useRef, useState } from 'react';
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

import { genreList, headerHeight } from '../utils/constants';
import { Focused, LogoutBtn } from './ui';

import Search from './Search';
import ActionSection from './ActionSection';
import { useFocusState } from '../hooks';
import FilterBtn from './FilterBtn';

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
    icon: (focused: boolean) => (focused ? 'home' : 'home-outline'),
  },
  {
    name: screens.Library,
    focusedRoute: 'Library',
    title: 'Library',
    icon: (focused: boolean) => (focused ? 'heart' : 'heart-outline'),
  },
];

const DrawerMenu: React.FC<DrawerContentComponentProps> = ({
  state,
  navigation,
}) => {
  const dispatch = useAppDispatch();

  const logoutUser = () => {
    dispatch(logOut());
  };
  const isDrawerOpen = useDrawerStatus() === 'open';
  const closeDrawerMenu = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
  };
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const currentRoute = drawerRoutes[state.index].name;

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
            style={[styles.drawerItem]}
            focusable
            focusedStyle={styles.drawerItemFocused}
          >
            <Icon
              name={route.icon(currentRoute)}
              size={30}
              color={palette.whiteColor}
            />

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
      <FilterBtn
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        style={styles.filterBtn}
        focusedStyle={styles.filterBtnFocused}
      >
        <Text style={[styles.filterLabel, styles.filterTitle]}>Filters</Text>
      </FilterBtn>
      {isFilterOpen ? (
        <ActionSection
          closeDrawerMenu={closeDrawerMenu}
          setIsFilterOpen={setIsFilterOpen}
          currentRoute={currentRoute}
        />
      ) : null}
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
    paddingLeft: 16,
    borderBottomWidth: 1,
    borderBottomColor: palette.footerTextColor,
  },
  filterLabel: {
    color: palette.whiteColor,
    fontSize: 16,
  },
  filterLabelFocused: {
    color: palette.accentColor,
    fontSize: 16,
  },
  filterTitle: {
    marginLeft: 16,
    fontSize: 18,
  },
  filterBtn: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  filterBtnFocused: {
    backgroundColor: palette.accentColor,
  },
});
