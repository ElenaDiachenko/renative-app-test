import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Meta } from '../../components/ui';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

import React from 'react';
import VideoJS from '../../components/VideoJS';
import { useOrientation } from '../../hooks';

const VideoPlayer: NextPage = () => {
  const { query } = useRouter();
  const playerRef = React.useRef(null);
  const { height, width } = useOrientation();
  console.log(width, height);
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    fluid: true,
    width,
    height: height - 300,
    poster: '',
    sources: [
      {
        src: query.uri,
        type: 'video/mp4',
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };

  return (
    <Meta title={`Player page`} description={`Player page`}>
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
    </Meta>
  );
};

export default VideoPlayer;
