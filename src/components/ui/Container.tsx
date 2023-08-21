import React, { PropsWithChildren } from 'react';
import { View, ViewStyle } from 'react-native';
import { commonStyles } from '../../styles';

type ContainerProps = PropsWithChildren<{
  style?: ViewStyle;
}>;

const Container: React.FC<ContainerProps> = ({ children, style }) => {
  return <View style={[commonStyles.container, style]}>{children}</View>;
};

export default Container;
