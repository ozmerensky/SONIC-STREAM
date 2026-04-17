import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Track } from '../types/track';
import { Playlist } from '../types/playlist';

interface PlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  likedTrackIds: string[];
  playlists: Playlist[];
  setCurrentTrack: (track: Track) => void;
  togglePlay: () => void;
  toggleLike: (trackId: string) => void;
  createPlaylist: (name: string) => void;
  addTrackToPlaylist: (playlistId: string, trackId: string) => void;
  updatePlaylistName: (playlistId: string, newName: string) => void; 
}


const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrackState] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [likedTrackIds, setLikedTrackIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('likedTracks');
    return saved ? JSON.parse(saved) : [];
  });

  const [playlists, setPlaylists] = useState<Playlist[]>(() => {
    const saved = localStorage.getItem('playlists');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('likedTracks', JSON.stringify(likedTrackIds));
  }, [likedTrackIds]);

  useEffect(() => {
    localStorage.setItem('playlists', JSON.stringify(playlists));
  }, [playlists]);

  const setCurrentTrack = (track: Track) => {
    setCurrentTrackState(track);
    setIsPlaying(true);
  };

  const togglePlay = () => setIsPlaying((prev) => !prev);

  const toggleLike = (trackId: string) => {
    setLikedTrackIds(prev => prev.includes(trackId) ? prev.filter(id => id !== trackId) : [...prev, trackId]);
  };

  const createPlaylist = (name: string) => {
    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      name,
      trackIds: []
    };
    setPlaylists(prev => [...prev, newPlaylist]);
  };

  const addTrackToPlaylist = (playlistId: string, trackId: string) => {
    setPlaylists(prev => prev.map(pl => 
      pl.id === playlistId && !pl.trackIds.includes(trackId)
        ? { ...pl, trackIds: [...pl.trackIds, trackId] }
        : pl
    ));
  };
  const updatePlaylistName = (playlistId: string, newName: string) => {
    setPlaylists(prev => prev.map(pl => 
      pl.id === playlistId ? { ...pl, name: newName } : pl
    ));
  };

  return (
    <PlayerContext.Provider value={{ 
      currentTrack, isPlaying, likedTrackIds, playlists, 
      setCurrentTrack, togglePlay, toggleLike, createPlaylist, addTrackToPlaylist, updatePlaylistName 
    }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) throw new Error('usePlayer must be used within a PlayerProvider');
  return context;
};
