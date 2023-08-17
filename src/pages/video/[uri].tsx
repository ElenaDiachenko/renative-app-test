import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Meta } from '../../components/ui';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

import React from 'react';
import VideoJS from '../../components/VideoJS';

const VideoPlayer: NextPage = () => {
  const { query } = useRouter();
  const playerRef = React.useRef(null);
  console.log(query.uri);
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    fluid: true,
    sources: [
      {
        src: 'https://imdb-video.media-imdb.com/vi3877612057/1434659607842-pgv4ql-1616202333253.mp4?Expires=1692324205&Signature=j9zXRLaRYHIk84BoYiQHy6VZ-jE0C0xUHUIoIk5cufCzCyIa02DEQFuTY8CFaakLYZObUmXNW6JwpKkAMaJJdrv2XEWusFp4QhoPmS7yp2QA5gNmD8IZgMDmf~ChmaIq1qzWZWjAHa31TQCsYbqsmPKMafrO4NMB643gmgF6Hxw31kFVetilgnLEOyCHNdcu715y2zflDzdTF8ts50nUp1XtpfGTKKj8Uw2ys2Oc4vdVVCeVg-Zpj3fiV8Pxa~nNtVDrSEsJYy1HSw~XIJswqV~72SdiWm91YosDhLYRioDDSywh0~3sVeggUSWliwncMUGjOnoJzGnyx~1UzF7-gg__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
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
