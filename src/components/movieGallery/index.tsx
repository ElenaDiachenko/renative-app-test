import React, { FC, useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import MovieCard from '../movieCard';
import { Movie } from '../../types';

import { commonStyles, palette } from '../../styles';
import { useOrientation } from '../../hooks';
import { Loader, Pagination } from '../ui';
import { isPlatformAndroidtv } from '@rnv/renative';
import { useLibraryState } from '../../hooks';
import FilterBtn from '../FilterBtn';
import CustomHeader from '../CustomHeader.tv';
import ActionSection from '../ActionSection';
type GalleryPropType = {
  prevRoute: string;
};

const renderMovieCard = ({
  item,
  index,
  prevRoute,
}: {
  item: Movie;
  index: number;
  prevRoute: string;
}) => <MovieCard movie={item} index={index} prevRoute={prevRoute} />;

const MovieGallery: FC<GalleryPropType> = ({ prevRoute }) => {
  const { isPortrait, width, height } = useOrientation();
  const [numCols, setCols] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { data, isLoading, isError, changeSearchParams } =
    useLibraryState(prevRoute);

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
    <View
      style={{
        paddingTop: 10,
        width: '100%',
        height: '100%',
        backgroundColor: palette.mainBgColor,
      }}
    >
      {isLoading && <Loader size={isPortrait ? width / 6 : height / 6} full />}
      {isError && (
        <View style={styles.innerContainer}>
          <Text>An error has occurred. Try again later.</Text>
        </View>
      )}
      {!isLoading && movieData && (
        <FlatList
          ListHeaderComponent={
            <>
              {isPlatformAndroidtv && (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <FilterBtn
                      isFilterOpen={isFilterOpen}
                      setIsFilterOpen={setIsFilterOpen}
                    />
                    <CustomHeader />
                  </View>
                  {isFilterOpen && (
                    <ActionSection
                      closeDrawerMenu={() => {}}
                      setIsFilterOpen={setIsFilterOpen}
                    />
                  )}
                </>
              )}
            </>
          }
          ListHeaderComponentStyle={{ paddingHorizontal: 10, marginBottom: 16 }}
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
          renderItem={({ item, index }) =>
            renderMovieCard({ item, index, prevRoute })
          }
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
