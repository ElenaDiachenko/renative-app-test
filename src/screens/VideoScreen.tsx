import React from 'react';
import { StyleSheet, View } from 'react-native';
import Video from 'react-native-video';
import { useNavigation, useRoute } from '@react-navigation/native';
import { palette } from '../styles';
import { HomeStackScreenProps } from '../navigation/types';
import { GoBackButton } from '../components/ui';

const VideoScreen = () => {
  const route = useRoute<HomeStackScreenProps<'Video'>['route']>();
  const { goBack } =
    useNavigation<HomeStackScreenProps<'Video'>['navigation']>();
  const { uri } = route.params;

  console.log(uri);
  // const uri =
  //   'https://imdb-video.media-imdb.com/vi3877612057/1434659607842-pgv4ql-1616202333253.mp4?Expires=1692536188&Signature=at8f6Y2FxxLmGPpxVuXS8bGRHw6WwzUDK5XtZ5j3v0Kxm2Am7AyxCN0cevOani4AdWk4BfFLYVNFnczOirZ-3mHSzLH6MAw2uLvIPBDUsFOBnSTtyBRbaQ4PMzj7mr6H9azaV3dVFFeBewVQ8Bvkb4PdI4p-0r~f6JGJDXtewUu7UGb9V3-lIlgazrelZsmsmvrZO7HP-i-M2kKyTj-soFB-nha1YO~ugzUMbfsxU1MvW-xBOCjqZUuShlh2pM7qFG35Pec-c-sAPtbHS2q5o~j7AI5--AZOpIE~gqfdfWrc1XxV8XZQ223LH8p1xkj6bCh8vkF9C6zPVTOtr~NGIg__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA';
  return (
    <View style={styles.container}>
      <GoBackButton handlePress={() => goBack()} />
      <Video
        style={styles.video}
        source={{ uri }}
        disableFocus
        controls
        resizeMode="cover"
        onEnd={goBack}
        preventsDisplaySleepDuringVideoPlayback
        ignoreSilentSwitch="ignore"
      />
    </View>
  );
};

export default VideoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.mainBgColor,
  },
  video: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: palette.mainBgColor,
  },
});
