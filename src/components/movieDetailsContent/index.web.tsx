import React, { FC } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { useRouter } from 'next/router';
import { BsHeartFill, BsHeart } from 'react-icons/bs';
import { FaPlay } from 'react-icons/fa';
import LinearGradient from 'react-native-linear-gradient';

import { convertRating, convertTime, constants } from '../../utils';
import { commonStyles, palette } from '../../styles';
import { useToggleMovie, useOrientation } from '../../hooks';
import { Focused } from '../ui';
import { Movie } from '../../types';

type MoviePropsType = {
  movie: Movie;
  backLink: string;
  goBack: () => void;
};

const MovieDetailsContent: FC<MoviePropsType> = ({
  movie,
  backLink,
  goBack,
}) => {
  const { isPortrait, height } = useOrientation();
  const router = useRouter();
  const isHomeScreen = backLink === '/';

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
        <ScrollView>
          <View style={isPortrait ? styles.container : styles.containerRow}>
            <View style={[styles.posterBox, posterBoxStyle]}>
              <Image
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
                  style={styles.button}
                  focusedStyle={styles.buttonFocused}
                  handlePress={() => {
                    router.push(
                      {
                        pathname: '/video/[uri]',
                        query: {
                          uri: movie.videos[0],
                        },
                      },
                      '/video',
                    );
                  }}
                >
                  <FaPlay size={25} color={palette.whiteColor} />
                  <Text
                    style={[
                      commonStyles.text,
                      { marginLeft: 10, fontWeight: '600' },
                    ]}
                  >
                    WATCH
                  </Text>
                </Focused>
                <Focused
                  style={styles.button}
                  focusedStyle={styles.buttonFocused}
                  handlePress={() => toggleMovie(movie)}
                >
                  {isHomeScreen ? (
                    <BsHeart size={25} color={palette.whiteColor} />
                  ) : (
                    <BsHeartFill size={25} color={palette.whiteColor} />
                  )}

                  <Text
                    style={[
                      commonStyles.text,
                      { marginLeft: 10, fontWeight: '600' },
                    ]}
                  >
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
    backgroundColor: palette.mainBgColor,

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
    backgroundColor: 'red',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    width: 100,
    fontWeight: 'bold',
    fontSize: 16,
    color: palette.whiteColor,
  },
  content: {
    fontWeight: '500',
    fontSize: 16,
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
    height: 60,
    minWidth: '25%',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: palette.whiteColor,
  },
  buttonFocused: {
    backgroundColor: palette.accentColor,
    borderColor: palette.accentColor,
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
