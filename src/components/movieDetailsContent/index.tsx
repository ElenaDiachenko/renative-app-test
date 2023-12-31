import React, { FC } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { isPlatformAndroidtv, isPlatformAndroid } from '@rnv/renative';

import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import { StackNavigationProp } from '@react-navigation/stack';
import FastImage from 'react-native-fast-image';

import { convertRating, convertTime, constants } from '../../utils';
import { commonStyles, palette } from '../../styles';
import { useToggleMovie, useOrientation } from '../../hooks';

import { Focused, GoBackButton } from '../ui';
import { HomeStackNavigatorParamList } from '../../navigation/types';

import { useAppSelector } from '../../redux/hooks';
import { selectMovieById } from '../../redux/movies/selectors';

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
  const { isPortrait, height } = useOrientation();
  const { navigate, goBack } = navigation;
  const isHomeScreen = prevRoute === 'Home';
  const movie = useAppSelector(selectMovieById(movieId, isHomeScreen));

  const { toggleMovie } = useToggleMovie({ isHomeScreen, goBack });

  const posterBoxStyle = {
    width: isPortrait ? '100%' : undefined,
    height: isPortrait ? undefined : height - 90,
    aspectRatio: constants.ASPECT_RATIO,
  };

  const infoContainerStyle = {
    width: isPortrait ? '100%' : '65%',
    paddingHorizontal: isPortrait ? 16 : 16,
    paddingTop: 16,
  };

  return (
    <>
      {movie && (
        <ScrollView style={{ paddingHorizontal: 16 }}>
          <GoBackButton handlePress={() => goBack()} />
          <View
            style={
              isPortrait || !isPlatformAndroidtv
                ? styles.container
                : styles.containerRow
            }
          >
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
                <Text style={styles.title}>
                  {constants.fields.RELEASE_DATE}
                </Text>
                <Text style={styles.content}>{movie.releaseDate}</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.title}>{constants.fields.DURATION}</Text>
                <Text style={styles.content}>
                  {convertTime(movie.duration)}
                </Text>
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
                  <Ionicons
                    name="play"
                    size={isPortrait ? 26 : 30}
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
                  {isHomeScreen ? (
                    <Ionicons
                      name="heart-outline"
                      size={isPortrait ? 26 : 30}
                      color={palette.whiteColor}
                    />
                  ) : (
                    <Ionicons
                      name="heart"
                      size={isPortrait ? 26 : 30}
                      color={palette.whiteColor}
                    />
                  )}

                  <Text style={[commonStyles.text, { marginLeft: 4 }]}>
                    {isHomeScreen ? 'SAVE' : 'REMOVE'}
                  </Text>
                </Focused>
              </View>
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
    alignItems: 'center',

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
    backgroundColor: palette.modalGreyText,
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
    justifyContent: 'center',
    width: isPlatformAndroidtv ? '30%' : '35%',
    height: 50,

    borderWidth: 2,
    borderRadius: 5,
    borderColor: palette.whiteColor,
  },
  buttonFocused: {
    backgroundColor: palette.accentColor,
    borderColor: palette.accentColor,
  },
});
