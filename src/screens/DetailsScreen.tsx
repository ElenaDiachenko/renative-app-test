import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
// import { AppStackScreenProps } from '../navigation/types';
// import { MovieDetailsContent, ScreenWrapper } from '../components';
import { palette } from '../styles';

const DetailsScreen = () => {
  // const route = useRoute<AppStackScreenProps<'Details'>['route']>();
  // const navigation =
  //   useNavigation<AppStackScreenProps<'Details'>['navigation']>();
  // const { movieId } = route.params;

  return (
    <View>
      <Text style={{ color: palette.whiteColor }}>DetailsScreen</Text>
    </View>

    // <ScreenWrapper style={styles.container}>
    //   <MovieDetailsContent movieId={movieId} navigation={navigation} />
    // </ScreenWrapper>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.mainBgColor,
  },
});
