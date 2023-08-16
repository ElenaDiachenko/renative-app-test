import React, { FC } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { palette } from '../../styles';
import { isWebBased } from '@rnv/renative';

type LoaderProps = {
  size?: 'small' | 'large' | number;
  full?: boolean;
};
const Loader: FC<LoaderProps> = ({ size = 'large', full = false }) => {
  return (
    <View style={full ? styles.indicatorWrapperFull : styles.indicatorWrapper}>
      <ActivityIndicator
        size={size}
        color={palette.accentColor}
        animating
        style={{ alignSelf: 'center' }}
      />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  indicatorWrapperFull: {
    flex: 1,
    height: isWebBased ? '100vh' : '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.mainBgColor,
  },
  indicatorWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
