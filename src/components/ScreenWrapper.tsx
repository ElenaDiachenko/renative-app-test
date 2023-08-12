import {
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import React, { memo, ReactNode, useEffect, useState } from 'react';
import { View, ViewStyle } from 'react-native';

import { HomeStackScreenProps } from '../navigation/index.tv';

type ValidNavigateRoute = 'Home' | 'Library';

type ScreenProps = {
  children: ReactNode;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
};

const ScreenWrapper = ({ children, style, contentStyle }: ScreenProps) => {
  // const isFocused = useIsFocused();
  // const navigation =
  //   useNavigation<HomeStackScreenProps<'Home'>['navigation']>();
  // const { name: route } = useRoute<HomeStackScreenProps<'Home'>['route']>();
  // const [isFilterOpen, setIsFilterOpen] = useState(false);

  // const [targetNavigate, setTargetNavigate] =
  //   useState<ValidNavigateRoute>('Library');

  // useEffect(() => {
  //   if (route === 'Home') {
  //     setTargetNavigate('Library');
  //   } else if (route === 'Library') {
  //     setTargetNavigate('Home');
  //   }
  // }, [route]);

  return (
    <View style={style}>
      <View style={[contentStyle]}>{children}</View>
    </View>
  );
};

export default memo(ScreenWrapper);
