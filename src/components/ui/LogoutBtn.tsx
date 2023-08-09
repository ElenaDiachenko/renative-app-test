import { ViewStyle } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import React from 'react';
import { palette } from '../../styles';
import Focused from './Focused';

type Props = {
  handlePress: () => void;
  style: ViewStyle;
};

const LogoutBtn = ({ handlePress, style }: Props) => {
  return (
    <Focused style={style} handlePress={() => handlePress()}>
      <Feather name="log-out" size={30} color={palette.whiteColor} />
    </Focused>
  );
};

export default LogoutBtn;
