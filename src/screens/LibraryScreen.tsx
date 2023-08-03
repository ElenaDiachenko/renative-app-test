import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { palette } from '../styles';

const LibraryScreen = () => {
  return (
    <View>
      <Text style={{ color: palette.whiteColor }}>LibraryScreen</Text>
    </View>
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.mainBgColor,
  },
});
