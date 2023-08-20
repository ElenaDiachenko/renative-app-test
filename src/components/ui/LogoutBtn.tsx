import { ViewStyle } from 'react-native';
import { isWebBased } from '@rnv/renative';
import { FiLogOut } from 'react-icons/fi';
import Feather from 'react-native-vector-icons/Feather';
import React from 'react';
import { palette } from '../../styles';
import Focused from './Focused';
import { useFocusState } from '../../hooks';

type Props = {
  handlePress: () => void;
  style: ViewStyle;
};

const LogoutBtn = ({ handlePress, style }: Props) => {
  const [isFocusedBtn, handleFocusChange] = useFocusState();
  return (
    <Focused
      style={style}
      handlePress={() => handlePress()}
      onFocus={() => handleFocusChange(true)}
      onBlur={() => handleFocusChange(false)}
    >
      {isWebBased ? (
        <FiLogOut
          size={30}
          color={isFocusedBtn ? palette.accentColor : palette.whiteColor}
        />
      ) : (
        <Feather
          name="log-out"
          size={30}
          color={isFocusedBtn ? palette.accentColor : palette.whiteColor}
        />
      )}
    </Focused>
  );
};

export default LogoutBtn;
