import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Meta } from '../../components/ui';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

import React from 'react';
import VideoJS from '../../components/VideoJS';
import { GoBackButton } from '../../components/ui';
const VideoPlayer: NextPage = () => {
  const { query, back } = useRouter();
  const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    fluid: true,
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
      <GoBackButton handlePress={() => back()} />
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
    </Meta>
  );
};

export default VideoPlayer;
