import { TouchableOpacity, ViewStyle } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import React from 'react';
import { palette } from '../styles';

type Props = {
  handlePress: () => void;
  style: ViewStyle;
};

const LogoutBtn = ({ handlePress, style }: Props) => {
  return (
    <TouchableOpacity style={style} onPress={() => handlePress()}>
      <Feather name="log-out" size={30} color={palette.footerTextColor} />
    </TouchableOpacity>
  );
};

export default LogoutBtn;
