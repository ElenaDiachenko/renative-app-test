import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

// import { MovieGallery, ScreenWrapper } from '../components';
// import { libraryRequests } from '../API';
// import { useLibraryQuery } from '../hooks';

import { palette } from '../styles';

const LibraryScreen = () => {
  return (
    <View>
      <Text style={{ color: palette.whiteColor }}>LibraryScreen</Text>
    </View>
    // <ScreenWrapper style={styles.container}>
    //   <MovieGallery
    //     movieHandler={useLibraryQuery}
    //     fetchData={libraryRequests.fetchMovies}
    //   />
    // </ScreenWrapper>
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.mainBgColor,
  },
});
