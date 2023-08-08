import { StyleSheet } from 'react-native';
import React from 'react';
import { MovieGallery } from '../components';
import { useLibraryQuery } from '../hooks';

type Props = {};
const CURRENT_SCREEN = 'Library';
const LibraryScreen = (props: Props) => {
  useLibraryQuery(CURRENT_SCREEN);
  return <MovieGallery prevRoute={CURRENT_SCREEN} />;
};

export default LibraryScreen;

const styles = StyleSheet.create({});
