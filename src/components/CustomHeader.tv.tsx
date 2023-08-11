import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { HomeStackScreenProps } from '../navigation/index.tv';
import { useNavigation, useRoute } from '@react-navigation/native';
import { palette } from '../styles';
import { Focused } from './ui';

import { useFocusState } from '../hooks';
import { useAppDispatch } from '../redux/hooks';
import { logOut } from '../redux/auth/operations';

const CustomHeader = () => {
  const navigation =
    useNavigation<HomeStackScreenProps<'Home'>['navigation']>();
  const { name: route } = useRoute<HomeStackScreenProps<'Home'>['route']>();
  const [isFocusedLibrary, handleFocusChangeLibrary] = useFocusState();
  const [isFocusedLogout, handleFocusChangeLogout] = useFocusState();
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Focused
        onFocus={() => handleFocusChangeLibrary(true)}
        onBlur={() => handleFocusChangeLibrary(false)}
        handlePress={() =>
          navigation.navigate(route === 'Home' ? 'Library' : 'Home')
        }
        style={{ ...styles.logoutBtn }}
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
        handlePress={() => {
          dispatch(logOut());
        }}
        onFocus={() => handleFocusChangeLogout(true)}
        onBlur={() => handleFocusChangeLogout(false)}
      >
        <Feather
          name="log-out"
          size={26}
          color={isFocusedLogout ? palette.accentColor : palette.whiteColor}
        />
      </Focused>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'yellow',
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  logoutBtn: {
    padding: 10,
    maxWidth: 100,
  },
});
