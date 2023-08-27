import React, { FC, useEffect, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { isPlatformAndroid, isPlatformWeb } from '@rnv/renative';
import { useRoute } from '@react-navigation/native';
import { NextRouter } from 'next/router';
import { palette } from '../../styles';
import Search from '../Search';
import Sort from '../sort/index.web';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectors, filterActions } from '../../redux/filter';
import { constants, isGenre } from '../../utils';
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
  const { name: routeName } = isPlatformWeb
    ? { name: router?.pathname === '/' ? 'Home' : 'Library' }
    : useRoute();

  const [query, setQuery] = useState(initialQuery);
  const [errorMessage, setErrorMessage] = useState('');

  const searchParameters = useAppSelector(selectors.selectFilterMovie);
  const librarySearchParameters = useAppSelector(selectors.selectFilterlibrary);
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
      dispatch(filterActions.setSearchParameters(updatedSearchParams));
    } else {
      dispatch(filterActions.setLibrarySearchParameters(updatedSearchParams));
    }
    setErrorMessage('');
  };
  const handleSort = (newSortState: typeof sortState) => {
    const updatedSearchParams = {
      ...newSortState,
      page: 1,
    };
    if (isHomeScreen) {
      dispatch(filterActions.setSearchParameters(updatedSearchParams));
    } else {
      dispatch(filterActions.setLibrarySearchParameters(updatedSearchParams));
    }
  };

  return (
    <View>
      <View style={styles.innerContainer}>
        <View
          style={[
            {
              width: '25%',
              flexDirection: 'row',
            },
          ]}
        >
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
            flexDirection: 'row',
            paddingLeft: '10%',
          }}
        >
          {isPlatformAndroid && (
            <Text style={[styles.filterLabel, { paddingBottom: 16 }]}>
              Search By Title:
            </Text>
          )}
          <View>
            <Search
              handleChange={handleSearch}
              setMessage={setErrorMessage}
              query={query.keyword}
            />
            {errorMessage ? (
              <Text
                style={{
                  color: palette.warningText,
                  textAlign: 'center',
                  marginTop: 5,
                }}
              >
                {errorMessage}
              </Text>
            ) : null}
          </View>
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
