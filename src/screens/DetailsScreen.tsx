import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { HomeStackScreenProps } from '../navigation/types';
import { MovieDetailsContent } from '../components';
import { palette } from '../styles';
import { useAppDispatch } from '../redux/hooks';
import { fetchById } from '../redux/movies/operations';

const DetailsScreen = ({
  navigation,
  route,
}: HomeStackScreenProps<'Details'>) => {
  const { movieId, prevRoute } = route.params;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchById(movieId));
  }, [movieId, dispatch]);

  console.log(prevRoute, 'prevRoute');
  return (
    <View style={styles.container}>
      {/* <ScreenWrapper style={styles.container}> */}
      <MovieDetailsContent navigation={navigation} prevRoute={prevRoute} />

      {/* </ScreenWrapper> */}
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
