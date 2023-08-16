import React, { FC, useState, useEffect } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import Link from 'next/link';
import MovieCard from '../movieCard/index.web';
import { Movie, MovieDataType } from '../../types';

import { commonStyles, palette } from '../../styles';
import { useOrientation } from '../../hooks';
import { Loader, Pagination } from '../ui';
import { isPlatformAndroidtv } from '@rnv/renative';
import { useLibraryState } from '../../hooks';
import FilterBtn from '../FilterBtn';
import CustomHeader from '../CustomHeader.tv';
import ActionSection from '../ActionSection';
import { useAppDispatch } from '../../redux/hooks';
import { logIn, logOut } from '../../redux/auth/operations';
import {
  setLibrarySearchParameters,
  setSearchParameters,
} from '../../redux/filter/slice';
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
  const [numCols, setCols] = useState(5);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isHomeScreen = prevRoute === 'Home';
  const { data: movieData, currentPage, totalPages } = data;
  const paginate = (page: number) => {
    isHomeScreen
      ? dispatch(setSearchParameters({ page }))
      : dispatch(setLibrarySearchParameters({ page }));
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
                <FilterBtn
                  isFilterOpen={isFilterOpen}
                  setIsFilterOpen={setIsFilterOpen}
                />
                {/* <CustomHeader /> */}
                <Button
                  title="Login"
                  onPress={() =>
                    dispatch(
                      logIn({ email: 'mary@gmail.com', password: 'mary1234' }),
                    )
                  }
                />
                <Button title="Logout" onPress={() => dispatch(logOut())} />
                <Button
                  title="Library"
                  onPress={() => {
                    router.push('/library');
                  }}
                />
                <Button
                  title="Login Page"
                  onPress={() => {
                    router.push('/login');
                  }}
                />
              </View>
              {/* {isFilterOpen && (
                <ActionSection
                  closeDrawerMenu={() => {}}
                  setIsFilterOpen={setIsFilterOpen}
                />
              )} */}
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
