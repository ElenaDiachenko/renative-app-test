import React, { FC, useEffect, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { isPlatformAndroidtv } from '@rnv/renative';
import { useFocusState, useOrientation } from '../hooks';
import GenreList from './GenreList';
import { palette } from '../styles';
import { Focused } from './ui';
import Search from './Search';
import Sort from './Sort';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  selectFilterMovie,
  selectFilterlibrary,
} from '../redux/filter/selectors';
import {
  setSearchParameters,
  setLibrarySearchParameters,
} from '../redux/filter/slice';
import { constants, isGenre } from '../utils';
import GenreListHorizontal from './GenreListHorizontal';
import { useRoute } from '@react-navigation/native';

type ActionSectionProps = {
  closeDrawerMenu: () => void;
  setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialQuery = {
  keyword: '',
  genre: '',
};

const ActionSection: FC<ActionSectionProps> = ({
  closeDrawerMenu,
  setIsFilterOpen,
}) => {
  const { name: route } = useRoute();

  const [isFocusedGenre, handleFocusChangeGenre] = useFocusState();
  const [query, setQuery] = useState(initialQuery);
  const [errorMessage, setErrorMessage] = useState('');

  const [openGenres, setOpenGenres] = useState(false);

  const searchParameters = useAppSelector(selectFilterMovie);
  const librarySearchParameters = useAppSelector(selectFilterlibrary);
  const dispatch = useAppDispatch();
  const isHomeScreen = route === 'Home';
  const sortState = {
    sort: searchParameters.sort,
    order: searchParameters.order,
  };

  useEffect(() => {
    if (!searchParameters || !librarySearchParameters) return;

    if (isHomeScreen) {
      isGenre(searchParameters.query)
        ? setQuery({
            keyword: '',
            genre: searchParameters.query,
          })
        : setQuery({
            genre: '',
            keyword: searchParameters.query,
          });
    } else
      isGenre(librarySearchParameters.query)
        ? setQuery({
            keyword: '',
            genre: librarySearchParameters.query,
          })
        : setQuery({
            genre: '',
            keyword: librarySearchParameters.query,
          });
  }, [librarySearchParameters.query, searchParameters.query]);

  const handleFilters = () => {
    setIsFilterOpen((prev) => !prev);
  };

  const handleSearch = (searchQuery: string) => {
    const evalGenre = searchQuery === 'all genres' ? '' : searchQuery;
    const updatedSearchParams = {
      query: evalGenre,
      page: 1,
    };
    if (isHomeScreen) {
      dispatch(setSearchParameters(updatedSearchParams));
    } else {
      dispatch(setLibrarySearchParameters(updatedSearchParams));
    }
    closeDrawerMenu();
    handleFilters();
    setOpenGenres(false);
  };
  const handleSort = (newSortState: typeof sortState) => {
    const updatedSearchParams = {
      ...newSortState,
      page: 1,
    };
    if (isHomeScreen) {
      dispatch(setSearchParameters(updatedSearchParams));
    } else {
      dispatch(setLibrarySearchParameters(updatedSearchParams));
    }
    closeDrawerMenu();
    handleFilters();
  };

  return (
    <View style={{ paddingHorizontal: !isPlatformAndroidtv ? 16 : 0 }}>
      <View
        style={[
          { width: '100%' },
          isPlatformAndroidtv && styles.innerContainer,
        ]}
      >
        <View
          style={[
            {
              width: isPlatformAndroidtv ? '25%' : '100%',
              flexDirection: isPlatformAndroidtv ? 'row' : 'column',
            },
          ]}
        >
          {!isPlatformAndroidtv && (
            <Text style={[styles.filterLabel]}>Sort By:</Text>
          )}
          <Sort
            data={constants.sortList}
            handleChange={handleSort}
            sortState={sortState}
          />
        </View>
        <View
          style={{
            flexDirection: isPlatformAndroidtv ? 'row' : 'column',
            paddingLeft: isPlatformAndroidtv ? '10%' : 0,
          }}
        >
          {!isPlatformAndroidtv && (
            <Text style={[styles.filterLabel, { paddingBottom: 16 }]}>
              Search By Title:
            </Text>
          )}
          <Search
            handleChange={handleSearch}
            setMessage={setErrorMessage}
            query={query.keyword}
          />
          {errorMessage ? (
            <Text style={{ color: palette.warningText }}>{errorMessage}</Text>
          ) : null}
        </View>
      </View>

      {!isPlatformAndroidtv ? (
        <>
          <Focused
            handlePress={() => setOpenGenres((openGenres) => !openGenres)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 16,
            }}
            onFocus={() => handleFocusChangeGenre(true)}
            onBlur={() => handleFocusChangeGenre(false)}
          >
            <Text
              style={
                !isFocusedGenre ? styles.filterLabel : styles.filterLabelFocused
              }
            >
              Sort By Genre:
            </Text>
            {!openGenres ? (
              <Text
                style={{ ...styles.filterTitle, color: palette.accentColor }}
              >
                {query.genre || 'all genres'}
              </Text>
            ) : null}
          </Focused>
          {openGenres && (
            <View style={{ paddingHorizontal: 16 }}>
              <GenreList query={query.genre} handleChange={handleSearch} />
            </View>
          )}
        </>
      ) : (
        <GenreListHorizontal query={query.genre} handleChange={handleSearch} />
      )}
    </View>
  );
};

export default ActionSection;

const styles = StyleSheet.create({
  filterLabel: {
    color: palette.whiteColor,
    fontSize: 16,
  },
  filterLabelFocused: {
    color: palette.accentColor,
    fontSize: 16,
  },
  filterTitle: {
    marginLeft: 16,
    fontSize: 18,
  },
  filterBtn: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  filterBtnFocused: {
    backgroundColor: palette.accentColor,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
