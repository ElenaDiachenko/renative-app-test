import { StyleSheet } from 'react-native';
import React, { FC } from 'react';
import { isPlatformWeb } from '@rnv/renative';

import { BsArrowLeft } from 'react-icons/bs';
import Icon from 'react-native-vector-icons/Octicons';
import { palette } from '../../styles';
import Focused from './Focused';
import { useFocusState } from '../../hooks';

type GoBackButtonProps = {
  handlePress: () => void;
};
const GoBackButton: FC<GoBackButtonProps> = ({ handlePress }) => {
  const [isFocusedBtn, handleFocusChange] = useFocusState();

  return (
    <Focused
      style={styles.container}
      handlePress={handlePress}
      activeOpacity={0.7}
      onFocus={() => handleFocusChange(true)}
      onBlur={() => handleFocusChange(false)}
    >
      {isPlatformWeb ? (
        <BsArrowLeft
          size={25}
          color={isFocusedBtn ? palette.accentColor : palette.whiteColor}
        />
      ) : (
        <Icon
          name="arrow-left"
          size={25}
          color={isFocusedBtn ? palette.accentColor : palette.whiteColor}
        />
      )}
    </Focused>
  );
};

export default GoBackButton;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 45,
    height: 45,
    borderRadius: 20,
    backgroundColor: `${palette.mainBgColor}20%`,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
