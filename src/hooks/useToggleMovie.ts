import { Alert } from 'react-native';

import { Movie } from '../types';
import { useAppDispatch } from '../redux/hooks';
import {
  addMovie as addMovieToRedux,
  removeMovie,
} from '../redux/library/operations';
type useMovieProps = {
  isHomeScreen: boolean;
  goBack: () => void;
};

export const useToggleMovie = ({ isHomeScreen, goBack }: useMovieProps) => {
  const dispatch = useAppDispatch();

  const addMovie = async (id: string) => {
    await dispatch(addMovieToRedux(id));

    goBack();
  };

  const deleteMovie = async (id: string) => {
    await dispatch(removeMovie(id));

    goBack();
  };

  const toggleMovie = (selectedMovie: Movie): void => {
    isHomeScreen ? addMovie(selectedMovie._id) : deleteMovie(selectedMovie._id);
  };
  return { toggleMovie };
};
