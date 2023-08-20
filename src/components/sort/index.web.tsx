import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { HiOutlineArrowsUpDown } from 'react-icons/hi2';
import { palette } from '../../styles';
import { Focused } from '../ui';
import { useFocusState } from '../../hooks';
import { Select } from '../select/index.web';

type SortPropsType = {
  data: DataType[];
  handleChange: ChangeHandler;
  sortState: SortStateType;
};

type ChangeHandler = (newSortState: SortStateType) => void;
type DataType = {
  label: string;
  value: string;
};
type SortStateType = {
  sort: string;
  order: string;
};

const sortOptions = [
  { id: 'Year', value: 'releaseDate' },
  { id: 'Rating', value: 'rating' },
];
const Sort: FC<SortPropsType> = ({ data, handleChange, sortState }) => {
  const [isFocusedOrder, handleFocusChangeOrder] = useFocusState();
  const handleSortChange = (newSortValue: string) => {
    const newSort = { order: '1', sort: newSortValue };
    handleChange(newSort);
  };

  const handleOrderChange = () => {
    const newOrder = sortState.order === '1' ? '-1' : '1';
    const newSort = { ...sortState, order: newOrder };
    handleChange(newSort);
  };

  return (
    <View style={styles.container}>
      <Select
        data={sortOptions}
        handleChange={handleSortChange}
        value={sortState.sort}
      />
      <Focused
        handlePress={handleOrderChange}
        style={{ marginLeft: 6 }}
        onFocus={() => handleFocusChangeOrder(true)}
        onBlur={() => handleFocusChangeOrder(false)}
      >
        <HiOutlineArrowsUpDown
          size={24}
          color={isFocusedOrder ? palette.accentColor : palette.whiteColor}
        />
      </Focused>
    </View>
  );
};

export default Sort;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },

  arrowIcon: {
    transform: [{ rotate: '90deg' }],
  },
});
