import React, { FC } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'next/router';
import { constants, convertRating, calculateCardWidth } from '../../utils';
import { Movie } from '../../types';
import { palette } from '../../styles';
import { useOrientation } from '../../hooks';
import { Focused } from '../ui';

type MovieCardProps = {
  movie: Movie;
  prevRoute: string;
};

const MovieCard: FC<MovieCardProps> = ({ movie, prevRoute }) => {
  const { isPortrait } = useOrientation();
  const router = useRouter();
  const cardWidth = calculateCardWidth(isPortrait, constants.MAX_WIDTH_WEB);

  return (
    <Focused
      style={{ ...styles.card, width: cardWidth }}
      focusedStyle={styles.cardFocused}
      handlePress={() =>
        router.push(`/movie/${movie._id}?backLink=${router.pathname}`)
      }
    >
      <Image
        style={styles.cardImage}
        resizeMode="cover"
        source={{ uri: movie.poster[2] }}
      />
      <View style={styles.cardContent}>
        <View style={styles.movieInfo}>
          <Text style={styles.cardName} numberOfLines={1} ellipsizeMode="tail">
            {movie.title}
          </Text>
        </View>
        <Text style={styles.cardGenres} numberOfLines={1} ellipsizeMode="tail">
          {movie.genres.join(' | ')}
        </Text>
        <View style={styles.ratingYearContainer}>
          <View style={{ flexDirection: 'row', marginBottom: 3 }}>
            <Text style={styles.cardDescription}>Rating:</Text>
            <View style={styles.rating}>
              <Text style={styles.ratingText}>
                {convertRating(movie.rating || 0)}
              </Text>
            </View>
          </View>

          <Text style={styles.cardDescription}>Year: {movie.releaseDate}</Text>
        </View>
      </View>
    </Focused>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 5,
    borderRadius: 5,
    borderColor: palette.modalGreyText,
    borderWidth: 2,
    elevation: 2,
    transitionProperty: 'transform',
    transitionDuration: 300,
  },
  cardFocused: {
    transform: [{ scale: 1.03 }],
    borderColor: palette.accentColor,
    borderWidth: 1,
  },
  cardImage: {
    aspectRatio: constants.ASPECT_RATIO,
    width: '100%',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  cardContent: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  movieInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardName: {
    fontWeight: '500',
    fontSize: 14,
    color: palette.accentColor,
  },
  cardGenres: {
    fontSize: 12,
    color: palette.whiteColor,
  },
  cardDescription: {
    fontSize: 12,
    color: palette.modalGreyText,
  },
  ratingYearContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  rating: {
    backgroundColor: palette.accentColor,
    borderRadius: 5,
    color: palette.whiteColor,
    paddingHorizontal: 3,
  },
  ratingText: {
    color: palette.whiteColor,
  },
});

export default MovieCard;
