import React, { FC } from 'react';
import { StyleSheet, ViewProps } from 'react-native';
import { isPlatformWeb } from '@rnv/renative';
import { BiSearch } from 'react-icons/bi';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { palette } from '../../styles';
import Focused from './Focused';
import { useFocusState } from '../../hooks';
type ButtonProps = {
  props?: ViewProps;
  isFocused: boolean;
  onPress?: () => void;
};

const SearchButton: FC<ButtonProps> = ({ onPress, isFocused, ...props }) => {
  const [isFocusedBtn, handleFocusChange] = useFocusState();
  const buttonStyle = isFocused
    ? [styles.button, styles.pressedButton]
    : styles.button;

  return (
    <Focused
      style={styles.button}
      {...props}
      handlePress={onPress}
      onFocus={() => handleFocusChange(true)}
      onBlur={() => handleFocusChange(false)}
    >
      {isPlatformWeb ? (
        <BiSearch
          size={24}
          color={isFocusedBtn ? palette.accentColor : palette.blackColor}
        />
      ) : (
        <Ionicons
          name="search"
          size={24}
          color={palette.blackColor}
          style={buttonStyle}
        />
      )}
    </Focused>
  );
};

export default SearchButton;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 2,
    top: 8,
  },
  pressedButton: {
    color: palette.accentColor,
  },
});
