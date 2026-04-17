import { useEffect, useRef, useState } from 'react';
import { usePlayer } from '../context/PlayerContext';

export const useAudio = () => {
  const { currentTrack, isPlaying } = usePlayer();
  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      if (audio.duration) {
        const currentProgress = (audio.currentTime / audio.duration) * 100;
        setProgress(currentProgress);
      }
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', () => {
    });

    if (currentTrack?.audioUrl) {
      const targetSrc = currentTrack.audioUrl; 

      if (audio.src !== window.location.origin + targetSrc) {
        audio.src = targetSrc;
        audio.load();
      }
    }

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
    };
  }, [currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;

    const handlePlay = async () => {
      if (isPlaying && currentTrack) {
        try {
          if (audio.readyState >= 2) {
            await audio.play();
          } else {
            audio.addEventListener('canplay', () => audio.play(), { once: true });
          }
        } catch (err: any) {
          if (err.name !== 'AbortError' && err.name !== 'NotSupportedError') {
            console.error("Playback error:", err);
          }
        }
      } else {
        audio.pause();
      }
    };

    handlePlay();
  }, [isPlaying, currentTrack]);

  return { audioRef, progress };
};
