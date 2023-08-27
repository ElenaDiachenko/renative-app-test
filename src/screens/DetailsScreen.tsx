import React from 'react';
import { StyleSheet, View } from 'react-native';
import { HomeStackScreenProps } from '../navigation/types';
import { MovieDetailsContent } from '../components';
import { palette } from '../styles';

const DetailsScreen = ({
  navigation,
  route,
}: HomeStackScreenProps<'Details'>) => {
  const { movieId, prevRoute } = route.params;

  return (
    <View style={styles.container}>
      <MovieDetailsContent
        navigation={navigation}
        prevRoute={prevRoute}
        movieId={movieId}
      />
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.mainBgColor,
  },
});
