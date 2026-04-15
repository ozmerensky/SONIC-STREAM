import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Track } from '../types/track';

interface PlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  setCurrentTrack: (track: Track) => void;
  togglePlay: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrackState] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const setCurrentTrack = (track: Track) => {
    setCurrentTrackState(track);
    setIsPlaying(true);
  };

  const togglePlay = () => setIsPlaying((prev) => !prev);

  return (
    <PlayerContext.Provider value={{ currentTrack, isPlaying, setCurrentTrack, togglePlay }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context){
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
