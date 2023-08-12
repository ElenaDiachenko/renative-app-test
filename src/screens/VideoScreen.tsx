import React from 'react';
import { StyleSheet, View } from 'react-native';
import VideoPlayer from 'react-native-video-player';
import { useNavigation, useRoute } from '@react-navigation/native';
import { palette } from '../styles';
import { HomeStackScreenProps } from '../navigation/types';

const VideoScreen = () => {
  const route = useRoute<HomeStackScreenProps<'Video'>['route']>();
  const { goBack } =
    useNavigation<HomeStackScreenProps<'Video'>['navigation']>();
  const { uri } = route.params;

  return (
    <View style={styles.container}>
      <VideoPlayer
        video={{
          uri,
        }}
        autoplay
        resizeMode="cover"
        showDuration
        pauseOnPress
        loop={false}
        style={styles.video}
        onEnd={goBack}
      />
    </View>
  );
};

export default VideoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    width: '100%',
    height: '100%',
    backgroundColor: palette.mainBgColor,
  },
});
