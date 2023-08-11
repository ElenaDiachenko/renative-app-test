import { StyleSheet } from 'react-native';
import React from 'react';
// import ScreenWrapper from '../components/ScreenWrapper';
import { MovieGallery, ScreenWrapper } from '../components';
import { useMovies } from '../hooks';
import { palette } from '../styles';

const CURRENT_SCREEN = 'Home';

const HomeScreen = () => {
  useMovies(CURRENT_SCREEN);
  return (
    <ScreenWrapper style={styles.container}>
      <MovieGallery prevRoute={CURRENT_SCREEN} />
    </ScreenWrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
