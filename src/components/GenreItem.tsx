import { Text } from 'react-native';
import React, { FC, memo } from 'react';
import { constants } from '../utils';
import { palette } from '../styles';
import { useFocusState, useOrientation } from '../hooks';
import { Focused } from './ui';

type GenreType = (typeof constants.genreList)[number];

type RenderItemType = {
  item: GenreType;
  pressedGenre: string;
  handleChange: (newQuery: string) => void;
};

const GenreItem: FC<RenderItemType> = ({
  item,
  pressedGenre,
  handleChange,
}) => {
  const { isPortrait } = useOrientation();
  const [isFocusedItem, handleFocusChangeItem] = useFocusState();
  const isPressed = pressedGenre === item.value;

  const textStyle = [
    { fontSize: isPortrait ? 16 : 18 },
    {
      color:
        isPressed || isFocusedItem ? palette.accentColor : palette.whiteColor,
    },
  ];

  return (
    <Focused
      hasTVPreferredFocus={isPressed}
      handlePress={() => handleChange(item.value)}
      onFocus={() => handleFocusChangeItem(true)}
      onBlur={() => handleFocusChangeItem(false)}
    >
      <Text style={textStyle}>{item.value}</Text>
    </Focused>
  );
};

export const MemoizedGenreItem = memo(GenreItem);
