import React, { FC, useEffect, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
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
type ActionSectionProps = {
  closeDrawerMenu: () => void;
};

const initialQuery = {
  keyword: '',
  genre: '',
};

const ActionSection: FC<ActionSectionProps> = ({ closeDrawerMenu }) => {
  const [isFocusedMenu, handleFocusChangeMenu] = useFocusState();
  const [query, setQuery] = useState(initialQuery);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const route = 'Home';
  const [openGenres, setOpenGenres] = useState(false);
  const searchParameters = useAppSelector(selectFilterMovie);
  const librarySearchParameters = useAppSelector(selectFilterlibrary);
  const dispatch = useAppDispatch();
  const { isPortrait } = useOrientation();

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
  const labelStyle = {
    fontSize: isPortrait ? 16 : 24,
  };
  return (
    <View style={{ paddingHorizontal: 16 }}>
      <Focused
        handlePress={handleFilters}
        style={[styles.filterBtn]}
        onFocus={() => handleFocusChangeMenu(true)}
        onBlur={() => handleFocusChangeMenu(false)}
      >
        <Icon
          name={isFocusedMenu ? 'grid' : 'grid-outline'}
          size={30}
          color={isFocusedMenu ? palette.accentColor : palette.whiteColor}
        />
        <Text style={[styles.filterLabel, styles.filterTitle]}>Filters</Text>
      </Focused>
      {isFilterOpen ? (
        <>
          <View>
            <Text
              style={[styles.filterLabel, labelStyle, { paddingBottom: 16 }]}
            >
              Search By Title:
            </Text>
            <Search
              handleChange={handleSearch}
              setMessage={setErrorMessage}
              query={query.keyword}
            />
            {errorMessage ? (
              <Text style={{ color: palette.warningText }}>{errorMessage}</Text>
            ) : null}
          </View>
          <View>
            <Text style={[styles.filterLabel, labelStyle]}>Sort By:</Text>
            <Sort
              data={constants.sortList}
              handleChange={handleSort}
              sortState={sortState}
            />
          </View>
          <Focused
            handlePress={() => setOpenGenres((openGenres) => !openGenres)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingBottom: 16,
            }}
          >
            <Text style={[styles.filterLabel, labelStyle]}>Sort By Genre:</Text>
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
      ) : null}
    </View>
  );
};

export default ActionSection;

const styles = StyleSheet.create({
  filterLabel: {
    color: palette.whiteColor,
  },
  filterLabelFocused: {
    color: palette.whiteColor,
    fontWeight: '600',
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
  },
  filterBtnFocused: {
    backgroundColor: palette.accentColor,
  },
});
