import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import LinearGradient from 'react-native-linear-gradient';

import { StackNavigationProp } from '@react-navigation/stack';
import FastImage from 'react-native-fast-image';

import { convertRating, convertTime, constants } from '../utils';
import { fetchMovieById } from '../API/movieRequests';

import { commonStyles, palette } from '../styles';
import { useOrientation } from '../hooks';

import { Focused, Loader } from './ui';
import { HomeStackNavigatorParamList } from '../navigation/types';
import { Movie } from '../types';
import { store } from '../redux/store';

type MoviePropsType = {
  movieId: string;
  prevRoute: string;
  navigation: StackNavigationProp<HomeStackNavigatorParamList, 'Details'>;
};

const MovieDetailsContent: FC<MoviePropsType> = ({
  movieId,
  navigation,
  prevRoute,
}) => {
  const { isPortrait, width, height } = useOrientation();
  const { navigate, getState, goBack } = navigation;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const isHomeScreen = prevRoute === 'Home';

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const data = await fetchMovieById(movieId);
        if (data) setMovie(data);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
        console.log(error);
      }
    })();
  }, []);

  //   const { toggleMovie } = useMovie({ isHomeScreen, goBack });
  const toggleMovie = (movie: Movie) => {};

  const posterBoxStyle = {
    width: isPortrait ? '100%' : undefined,
    height: isPortrait ? undefined : height - 90,
    aspectRatio: constants.ASPECT_RATIO,
  };

  const infoContainerStyle = {
    width: isPortrait ? '100%' : '65%',
    paddingHorizontal: isPortrait ? 16 : 0,
    paddingTop: 16,
  };

  return (
    <>
      {isLoading ? (
        <Loader size={isPortrait ? width / 6 : height / 6} full />
      ) : null}
      {movie && (
        <ScrollView style={isPortrait ? styles.container : styles.containerRow}>
          <View style={[styles.posterBox, posterBoxStyle]}>
            <FastImage
              style={[
                styles.infoImage,
                { aspectRatio: constants.ASPECT_RATIO },
              ]}
              resizeMode="cover"
              source={{ uri: movie.poster[2] }}
            />
            <LinearGradient
              colors={['transparent', 'rgba(0, 0, 0, 0.6)']}
              style={styles.gradient}
            />
          </View>
          <View style={infoContainerStyle}>
            <View style={styles.item}>
              <Text style={styles.title}>{constants.fields.RATING}</Text>

              <View style={styles.contentColor}>
                <Text style={commonStyles.text}>
                  {convertRating(movie.rating || 0)}
                </Text>
              </View>
            </View>
            <View style={styles.item}>
              <Text style={styles.title}>{constants.fields.RELEASE_DATE}</Text>
              <Text style={styles.content}>{movie.releaseDate}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.title}>{constants.fields.DURATION}</Text>
              <Text style={styles.content}>{convertTime(movie.duration)}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.title}>{constants.fields.TITLE}</Text>
              <Text style={[styles.content, { textTransform: 'uppercase' }]}>
                {movie.title}
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.title}>{constants.fields.GENRE}</Text>
              <Text style={styles.content}>
                {movie.genres.map((genre) => genre).join(' | ')}
              </Text>
            </View>
            <View style={styles.container}>
              <Text style={styles.title}>{constants.fields.CASTS}</Text>
              <Text style={[styles.content, { lineHeight: 20 }]}>
                {movie.casts?.slice(0, 10).join(', ')}
              </Text>
            </View>
            <View style={{ ...styles.container, marginTop: 10 }}>
              <Text style={styles.title}>{constants.fields.ABOUT}</Text>
              <Text style={[styles.content, { lineHeight: 20 }]}>
                {movie.desc}
              </Text>
            </View>
            <View style={styles.buttonBox}>
              <Focused
                hasTVPreferredFocus
                style={styles.button}
                focusedStyle={styles.buttonFocused}
                handlePress={() =>
                  navigate('Video', {
                    uri: movie.videos[0],
                  })
                }
              >
                <Octicons
                  name="play"
                  size={isPortrait ? 60 : 40}
                  color={palette.whiteColor}
                />
                <Text style={[commonStyles.text, { marginLeft: 4 }]}>
                  WATCH
                </Text>
              </Focused>
              <Focused
                style={styles.button}
                focusedStyle={styles.buttonFocused}
                handlePress={() => toggleMovie(movie)}
              >
                <View
                  style={{
                    ...(isPortrait
                      ? styles.iconBoxCentered
                      : styles.iconBoxCenteredLand),
                  }}
                >
                  {isHomeScreen ? (
                    <Octicons
                      name="heart"
                      size={isPortrait ? 26 : 20}
                      color={palette.whiteColor}
                    />
                  ) : (
                    <Octicons
                      name="heart-fill"
                      size={isPortrait ? 26 : 20}
                      color={palette.whiteColor}
                    />
                  )}
                </View>
                <Text style={[commonStyles.text, { marginLeft: 4 }]}>
                  {isHomeScreen ? 'SAVE' : 'REMOVE'}
                </Text>
              </Focused>
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default MovieDetailsContent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: palette.mainBgColor,
  },
  containerRow: {
    flexDirection: 'row',

    paddingLeft: 16,
    paddingVertical: 16,
  },
  posterBox: {
    position: 'relative',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
  },

  infoImage: {
    width: '100%',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    width: 100,
    fontWeight: 'bold',
    fontSize: 14,
    color: palette.whiteColor,
  },
  content: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 16,
    color: palette.modalGreyText,
  },
  contentColor: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
    backgroundColor: palette.accentColor,
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 4,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: palette.whiteColor,
  },
  buttonFocused: {
    backgroundColor: palette.accentColor,
    borderColor: palette.accentColor,
  },
  iconBoxCentered: {
    borderWidth: 5.5,
    borderColor: palette.whiteColor,
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBoxCenteredLand: {
    borderWidth: 3.5,
    borderColor: palette.whiteColor,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
