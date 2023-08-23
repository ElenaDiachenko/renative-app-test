import { useRouter } from 'next/router';
import React, { FC, useEffect, useRef } from 'react';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
import 'video.js/dist/video-js.css';

interface VideoJSProps {
  options: any;
  onReady?: (player: Player) => void;
}

export const VideoJS: FC<VideoJSProps> = (props) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);
  const { options, onReady } = props;
  const router = useRouter();
  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement('video-js');

      videoElement.classList.add('vjs-big-play-centered');
      if (videoRef?.current) {
        videoRef.current.appendChild(videoElement);
      }

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready');
        onReady && onReady(player);
      }));
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  // useEffect(() => {
  //   if (!playerRef.current) {
  //     const videoElement = document.createElement('video-js');
  //     const handleGoBack = () => {
  //       router.back();
  //     };
  //     videoElement.classList.add('vjs-big-play-centered');
  //     if (videoRef?.current) {
  //       videoRef.current.appendChild(videoElement);
  //     }

  //     const player = (playerRef.current = videojs(videoElement, options, () => {
  //       videojs.log('player is ready');
  //       onReady && onReady(player);
  //     }));

  //     const goBackButton = document.createElement('button');
  //     goBackButton.innerText = 'Go Back';
  //     goBackButton.style.position = 'absolute';
  //     goBackButton.style.top = '10px';
  //     goBackButton.style.left = '10px';
  //     goBackButton.addEventListener('click', handleGoBack);
  //     videoRef?.current?.appendChild(goBackButton);

  //     return () => {
  //       goBackButton.removeEventListener('click', handleGoBack);
  //     };
  //   } else {
  //     const player = playerRef.current;

  //     player.autoplay(options.autoplay);
  //     player.src(options.sources);
  //   }
  // }, [options, videoRef, history, onReady]);

  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
};

export default VideoJS;
