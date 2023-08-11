import {
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { isPlatformAndroidtv } from '@rnv/renative';
import React, { memo, ReactNode, useEffect, useState } from 'react';
import { View, ViewStyle } from 'react-native';

import { HomeStackNavigatorParamList } from '../navigation/index.tv';
import { HomeStackScreenProps } from '../navigation/index.tv';
import CustomHeader from './CustomHeader.tv';
import ActionSection from './ActionSection';
import { palette } from '../styles';
import FilterBtn from './FilterBtn';
type ValidNavigateRoute = 'Home' | 'Library';
type ScreenProps = {
  children: ReactNode;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
};

const ScreenWrapper = ({ children, style, contentStyle }: ScreenProps) => {
  const isFocused = useIsFocused();
  const navigation =
    useNavigation<HomeStackScreenProps<'Home'>['navigation']>();
  const { name: route } = useRoute<HomeStackScreenProps<'Home'>['route']>();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [targetNavigate, setTargetNavigate] =
    useState<ValidNavigateRoute>('Library');

  useEffect(() => {
    if (route === 'Home') {
      setTargetNavigate('Library');
    } else if (route === 'Library') {
      setTargetNavigate('Home');
    }
  }, [route]);

  return (
    <View style={{ flex: 1, backgroundColor: palette.mainBgColor }}>
      {isPlatformAndroidtv && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <FilterBtn
            isFilterOpen={isFilterOpen}
            setIsFilterOpen={setIsFilterOpen}
          />
          <CustomHeader />
        </View>
      )}
      {isFilterOpen && (
        <ActionSection
          closeDrawerMenu={() => {}}
          setIsFilterOpen={setIsFilterOpen}
        />
      )}
      <View style={[contentStyle]}>{children}</View>
    </View>
  );
};

export default memo(ScreenWrapper);
