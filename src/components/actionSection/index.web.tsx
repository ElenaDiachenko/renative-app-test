import React, { FC, useEffect, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import {
  isPlatformAndroid,
  isPlatformAndroidtv,
  isWebBased,
} from '@rnv/renative';
import { useFocusState } from '../../hooks';

import { palette } from '../../styles';
import { Focused } from '../ui';
import Search from '../Search';
import Sort from '../sort/index.web';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  selectFilterMovie,
  selectFilterlibrary,
} from '../../redux/filter/selectors';
import {
  setSearchParameters,
  setLibrarySearchParameters,
} from '../../redux/filter/slice';
import { constants, isGenre } from '../../utils';

import { useRoute } from '@react-navigation/native';
import { NextRouter } from 'next/router';
import { Select } from '../select/index.web';

type ActionSectionProps = {
  closeDrawerMenu?: () => void;

  currentRoute?: string;
  router?: NextRouter;
};

const initialQuery = {
  keyword: '',
  genre: '',
};

const ActionSection: FC<ActionSectionProps> = ({ currentRoute, router }) => {
  const { name: routeName } = isWebBased
    ? { name: router?.pathname === '/' ? 'Home' : 'Library' }
    : useRoute();

  const [query, setQuery] = useState(initialQuery);
  const [errorMessage, setErrorMessage] = useState('');

  const searchParameters = useAppSelector(selectFilterMovie);
  const librarySearchParameters = useAppSelector(selectFilterlibrary);
  const dispatch = useAppDispatch();
  const route = isPlatformAndroid ? currentRoute : routeName;
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
  };

  return (
    <View style={{ paddingHorizontal: !isPlatformAndroidtv ? 16 : 0 }}>
      <View style={styles.innerContainer}>
        <View
          style={[
            {
              width: !isPlatformAndroid ? '25%' : '100%',
              flexDirection: !isPlatformAndroid ? 'row' : 'column',
            },
          ]}
        >
          {isPlatformAndroid && (
            <Text style={[styles.filterLabel]}>Sort By:</Text>
          )}
          <Sort
            data={constants.sortList}
            handleChange={handleSort}
            sortState={sortState}
          />
        </View>

        <Select
          data={constants.genreList}
          handleChange={handleSearch}
          value={
            isHomeScreen
              ? searchParameters.query
              : librarySearchParameters.query
          }
        />
        <View
          style={{
            flexDirection: !isPlatformAndroid ? 'row' : 'column',
            paddingLeft: !isPlatformAndroid ? '10%' : 0,
          }}
        >
          {isPlatformAndroid && (
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
