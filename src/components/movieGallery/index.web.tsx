import React, { FC, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import MovieCard from '../movieCard/index.web';
import { Movie, MovieDataType } from '../../types';
import { commonStyles, palette } from '../../styles';
import { Pagination } from '../ui';
import CustomHeader from '../CustomHeader';
import ActionSection from '../actionSection/index.web';
import { useAppDispatch } from '../../redux/hooks';
import { filterActions } from '../../redux/filter';
import { useRouter } from 'next/router';

type GalleryPropType = {
  prevRoute: string;
  data: MovieDataType;
};

const renderMovieCard = ({
  item,
  index,
  prevRoute,
}: {
  item: Movie;
  index: number;
  prevRoute: string;
}) => <MovieCard movie={item} prevRoute={prevRoute} />;

const MovieGallery: FC<GalleryPropType> = ({ prevRoute, data }) => {
  const [numCols] = useState(5);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const isHomeScreen = prevRoute === 'Home';
  const { data: movieData, currentPage, totalPages } = data;
  const paginate = (page: number) => {
    isHomeScreen
      ? dispatch(filterActions.setSearchParameters({ page }))
      : dispatch(filterActions.setLibrarySearchParameters({ page }));
  };

  return (
    <View
      style={{
        paddingTop: 10,
        width: '100%',
        backgroundColor: palette.mainBgColor,
      }}
    >
      {movieData && (
        <FlatList
          ListHeaderComponent={
            <>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <ActionSection router={router} />
                <CustomHeader router={router} />
              </View>
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
            ) : (
              <View style={{ height: 50 }}></View>
            )
          }
          key={numCols}
          data={movieData}
          renderItem={({ item, index }) =>
            renderMovieCard({ item, index, prevRoute })
          }
          keyExtractor={(item) => item._id}
          numColumns={numCols}
          ListEmptyComponent={
            !movieData?.length ? (
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
