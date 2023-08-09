import { genreList } from './constants';

export const isGenre = (genreValue: string): boolean => {
  const matchingGenre = genreList.find((genre) => genre.value === genreValue);
  return !!matchingGenre;
};
