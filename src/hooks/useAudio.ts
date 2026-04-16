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
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.addEventListener('timeupdate', updateProgress);
    
    if (currentTrack?.audioUrl) {
      audio.src = currentTrack.audioUrl;
      if (isPlaying) {
        audio.play().catch(err => console.error("Playback failed:", err));
      }
    }

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
    };
  }, [currentTrack]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);
  
  return { audioRef, progress };
};
