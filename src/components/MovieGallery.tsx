import React, { FC, useState, useEffect } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { UseMovieQueryType } from '../hooks/useMovieQuery';
import { movieRequests, libraryRequests } from '../API';
import { UseLibraryQueryType } from '../hooks/useLibraryQuery';
import MovieCard from './MovieCard';
import { Movie } from '../types';
// import ActionSection from './ActionSection';
import { commonStyles } from '../styles';
import { useOrientation } from '../hooks';
import { Loader, Pagination } from './ui';
import { isPlatformAndroidtv } from '@rnv/renative';

type GalleryPropType = {
  movieHandler: UseMovieQueryType | UseLibraryQueryType;
  fetchData: movieRequests.FetchMoviesType | libraryRequests.FetchMoviesType;
};

const renderMovieCard = ({ item, index }: { item: Movie; index: number }) => (
  <MovieCard movie={item} index={index} />
);

const MovieGallery: FC<GalleryPropType> = ({ movieHandler, fetchData }) => {
  const { isPortrait, width, height } = useOrientation();
  const [numCols, setCols] = useState(0);
  const { data, isLoading, isError, changeSearchParams } =
    movieHandler(fetchData);

  const { data: movieData, currentPage, totalPages } = data || {};

  useEffect(() => {
    if (isPlatformAndroidtv) {
      return setCols(5);
    }
    const numColumnsPortrait = width < 600 ? 2 : 3;
    const numColumnsLandscape = width < 900 ? 3 : 4;
    if (isPortrait) {
      return setCols(numColumnsPortrait);
    }
    setCols(numColumnsLandscape);
  }, [width, isPortrait]);

  const paginate = (page: number) => {
    changeSearchParams({ page });
  };

  return (
    <View style={[commonStyles.container, { paddingTop: 10 }]}>
      {isLoading && <Loader size={isPortrait ? width / 6 : height / 6} full />}
      {isError && (
        <View style={styles.innerContainer}>
          <Text>An error has occurred. Try again later.</Text>
        </View>
      )}
      {!isLoading && movieData?.length && (
        <FlatList
          ListFooterComponent={
            currentPage && totalPages && totalPages > 1 ? (
              <Pagination
                limit={3}
                total={totalPages}
                paginate={paginate}
                currentPage={+currentPage}
                buttonConst={3}
                contentPerPage={5}
                siblingCount={1}
              />
            ) : null
          }
          key={numCols}
          data={movieData}
          renderItem={({ item, index }) => renderMovieCard({ item, index })}
          keyExtractor={(item) => item._id}
          numColumns={numCols}
          ListEmptyComponent={
            !isLoading && !movieData?.length ? (
              <View style={styles.innerContainer}>
                <Text style={commonStyles.text}>Not found</Text>
              </View>
            ) : null
          }
        />
      )}
    </View>
  );
};

export default MovieGallery;

const styles = StyleSheet.create({
  innerContainer: {
    alignSelf: 'center',
    marginTop: 10,
  },
});
