import { Alert } from 'react-native';
import { libraryRequests } from '../API';
import { Movie } from '../types';

type useMovieProps = {
  isHomeScreen: boolean;
  goBack: () => void;
};

export const useMovie = ({ isHomeScreen, goBack }: useMovieProps) => {
  const addMovie = async (id: string) => {
    try {
      const result = await libraryRequests.addMovie(id);
      if (result) Alert.alert('The movie has been saved successfully');
      goBack();
    } catch (error: any) {
      console.log(error);
      if (error?.response?.status === 403) {
        return Alert.alert(error?.response?.data?.message);
      }
      return Alert.alert('Something went wrong.Try again later');
    }
  };
  const deleteMovie = async (id: string) => {
    try {
      const result = await libraryRequests.deleteMovie(id);
      if (result) Alert.alert('The movie has been saved successfully');
      goBack();
    } catch (error: any) {
      console.log(error);
      Alert.alert('Something went wrong. Try again later');
    }
  };

  const toggleMovie = (selectedMovie: Movie): void => {
    isHomeScreen ? addMovie(selectedMovie._id) : deleteMovie(selectedMovie._id);
  };
  return { toggleMovie };
};
