import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { NextRouter } from 'next/router';
import Feather from 'react-native-vector-icons/Feather';
import { isWebBased } from '@rnv/renative';
import { FiLogOut } from 'react-icons/fi';
import {
  HomeStackNavigatorParamList,
  HomeStackScreenProps,
} from '../navigation/index.tv';
import { useNavigation, useRoute } from '@react-navigation/native';
import { palette } from '../styles';
import { Focused } from './ui';

import { useFocusState } from '../hooks';
import { useAppDispatch } from '../redux/hooks';
import { logOut } from '../redux/auth/operations';
import { StackNavigationProp } from '@react-navigation/stack';

type HeaderProps = {
  router?: NextRouter;
};
const CustomHeader: FC<HeaderProps> = ({ router }) => {
  let navigation: StackNavigationProp<HomeStackNavigatorParamList, 'Home'>;

  if (!isWebBased) {
    navigation = useNavigation();
  }

  const { name: route } = isWebBased
    ? { name: router?.pathname === '/' ? 'Home' : 'Library' }
    : useRoute<HomeStackScreenProps<'Home'>['route']>();
  const [isFocusedLibrary, handleFocusChangeLibrary] = useFocusState();
  const [isFocusedLogout, handleFocusChangeLogout] = useFocusState();
  const dispatch = useAppDispatch();

  const handleLogOut = async () => {
    await dispatch(logOut());
    router?.replace('/login');
  };
  return (
    <View style={styles.container}>
      <Focused
        onFocus={() => handleFocusChangeLibrary(true)}
        onBlur={() => handleFocusChangeLibrary(false)}
        handlePress={() => {
          isWebBased
            ? router?.push(route === 'Home' ? '/library' : '/')
            : navigation.navigate(route === 'Home' ? 'Library' : 'Home');
        }}
        style={{ marginRight: 30 }}
      >
        <Text
          style={{
            color: isFocusedLibrary ? palette.accentColor : palette.whiteColor,
            fontSize: 18,
          }}
        >
          {route === 'Home' ? 'Library' : 'Home'}
        </Text>
      </Focused>
      <Focused
        handlePress={handleLogOut}
        onFocus={() => handleFocusChangeLogout(true)}
        onBlur={() => handleFocusChangeLogout(false)}
      >
        {isWebBased ? (
          <FiLogOut
            size={26}
            color={isFocusedLogout ? palette.accentColor : palette.whiteColor}
          />
        ) : (
          <Feather
            name="log-out"
            size={26}
            color={isFocusedLogout ? palette.accentColor : palette.whiteColor}
          />
        )}
      </Focused>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutBtn: {
    padding: 10,
    maxWidth: 100,
  },
});
