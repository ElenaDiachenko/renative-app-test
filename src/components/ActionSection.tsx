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
  const [isFocusedGenre, handleFocusChangeGenre] = useFocusState();
  const [query, setQuery] = useState(initialQuery);
  const [errorMessage, setErrorMessage] = useState('');
  const route = 'Home';
  const [openGenres, setOpenGenres] = useState(false);

  const searchParameters = useAppSelector(selectFilterMovie);
  const librarySearchParameters = useAppSelector(selectFilterlibrary);
  const dispatch = useAppDispatch();

  const sortState = {
    sort: searchParameters.sort,
    order: searchParameters.order,
  };

  useEffect(() => {
    if (!searchParameters || !librarySearchParameters) return;
    const isHomeScreen = route === 'Home';
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
    if (route === 'Home') {
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
    if (route === 'Home') {
      dispatch(setSearchParameters(updatedSearchParams));
    } else {
      dispatch(setLibrarySearchParameters(updatedSearchParams));
    }
    closeDrawerMenu();
    handleFilters();
  };

  return (
    <View style={{}}>
      <View
        style={[
          { width: '100%', backgroundColor: 'red' },
          isPlatformAndroidtv && styles.innerContainer,
        ]}
      >
        <View
          style={[
            {
              width: isPlatformAndroidtv ? '40%' : '100%',
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
            width: isPlatformAndroidtv ? '60%' : '100%',
            backgroundColor: 'green',
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
              paddingBottom: 16,
              backgroundColor: 'orange',
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
    justifyContent: 'space-between',
  },
});
