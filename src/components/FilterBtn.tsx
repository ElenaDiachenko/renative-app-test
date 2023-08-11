import React, { FC, ReactNode } from 'react';
import { Text, StyleSheet, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { palette } from '../styles';
import { Focused } from './ui';
import { useFocusState } from '../hooks';

type FilterBtnProps = {
  children?: ReactNode | ReactNode[];
  style?: ViewStyle;
  focusedStyle?: ViewStyle;
  isFilterOpen: boolean;
  setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const FilterBtn: FC<FilterBtnProps> = ({
  isFilterOpen,
  setIsFilterOpen,
  children,
  style,
  focusedStyle,
}) => {
  const [isFocusedBtn, handleFocusChange] = useFocusState();
  const handleFilters = () => {
    setIsFilterOpen((prev) => !prev);
  };

  return (
    <Focused
      handlePress={handleFilters}
      style={style}
      focusedStyle={focusedStyle}
      onFocus={() => handleFocusChange(true)}
      onBlur={() => handleFocusChange(false)}
    >
      <Icon
        name={isFilterOpen ? 'grid' : 'grid-outline'}
        size={30}
        color={isFocusedBtn ? palette.accentColor : palette.whiteColor}
      />
      {children}
    </Focused>
  );
};

export default FilterBtn;
