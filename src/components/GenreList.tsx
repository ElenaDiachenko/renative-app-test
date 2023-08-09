import React, { useRef, useEffect, memo, FC } from 'react';
import { StyleSheet, View, FlatList, ListRenderItem } from 'react-native';

import { constants } from '../utils';
import { palette } from '../styles';
import { MemoizedGenreItem } from './GenreItem';

type GenreListProps = {
  handleChange: ChangeHandler;
  query: string;
};

type ChangeHandler = (newQuery: string) => void;
type GenreType = (typeof constants.genreList)[number];

const GenreList: FC<GenreListProps> = ({ handleChange, query }) => {
  const flatListRef = useRef<FlatList<GenreType>>(null);

  const renderItem: ListRenderItem<GenreType> = ({ item }) => {
    return (
      <MemoizedGenreItem
        item={item}
        handleChange={handleChange}
        pressedGenre={query ? query : 'all genres'}
      />
    );
  };

  const renderSeparator = (): JSX.Element => {
    return <View style={styles.separator} />;
  };

  useEffect(() => {
    if (flatListRef.current) {
      const index = constants.genreList.findIndex(
        (item) => item.value === query,
      );
      if (index !== -1) {
        flatListRef.current.scrollToIndex({ index, animated: true });
      }
    }
  }, [query]);

  const getItemLayout = (_: any, index: number) => ({
    length: styles.item.height,
    offset: styles.item.height * index,
    index,
  });

  const onScrollToIndexFailed = (info: {
    index: number;
    highestMeasuredFrameIndex: number;
    averageItemLength: number;
  }) => {
    const { index } = info;
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: 0, animated: true });
    }
    console.log('Scroll to index failed for index:', index);
  };

  return (
    <FlatList
      ref={flatListRef}
      data={constants.genreList}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={renderSeparator}
      initialNumToRender={constants.genreList.length}
      contentContainerStyle={{ paddingBottom: 750 }}
      getItemLayout={getItemLayout}
      onScrollToIndexFailed={onScrollToIndexFailed}
    />
  );
};

export default memo(GenreList);

const styles = StyleSheet.create({
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: palette.footerTextColor,
    marginVertical: 10,
  },
  item: {
    width: '100%',
    height: 50,
    paddingHorizontal: 20,
  },
});
