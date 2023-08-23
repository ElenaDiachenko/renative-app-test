import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'next/router';
import { BsArrowLeft } from 'react-icons/bs';
import { palette } from '../../styles';

const GoBackButton = () => {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.back()}
      activeOpacity={0.7}
    >
      <BsArrowLeft size={25} color={palette.whiteColor} />
    </TouchableOpacity>
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
    backgroundColor: palette.mainBgColor,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
