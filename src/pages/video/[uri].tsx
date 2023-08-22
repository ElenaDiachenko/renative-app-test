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

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    fluid: true,
    poster: '',
    sources: [
      {
        src: 'https://imdb-video.media-imdb.com/vi3877612057/1434659607842-pgv4ql-1616202333253.mp4?Expires=1692824268&Signature=Oy3~obShxrtqUjhpulJdYW4HWMo8tRYddWFy7AwxsaQJWM52Y8ZyUAgqrIIx0ATsF3TTBnYRjSmrAXC9qBcehTvtfzadybeU6WxaSL4Vx1JUg1y4aPfTQWLtzA1H-zghYwn8Blry6zjDSgck6c3yvc5UQZ5ONYMxhHcxyUqtD62ideJagMaoXZi5Te6JRtHDXOuuVdPNao2qnuFpBn9O98mTYfeNkjZJeLwkO7qt9am1hjmwrDh4kr-PCv9tsqQuT38mSQ1RuvU~s8pBKDwKk-MoAV-vxTHqYvQNf~d1k~7j2WPhzH6RnSGk3-Ygp4fhxy9gJIgsgWWOmW4QZjgutw__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
        // src: query.uri,
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
