import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Track } from '../types/track';
import { Playlist } from '../types/playlist';

interface PlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  likedTrackIds: string[];
  playlists: Playlist[];
  toastMessage: string | null;
  setCurrentTrack: (track: Track) => void;
  togglePlay: () => void;
  toggleLike: (trackId: string) => void;
  createPlaylist: (name: string) => void;
  addTrackToPlaylist: (playlistId: string, trackId: string) => void;
  updatePlaylistName: (playlistId: string, newName: string) => void; 
  deletePlaylist: (playlistId: string) => void;
  showToast: (message: string) => void;
  hideToast: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrackState] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };
  const hideToast = () => setToastMessage(null);
  
  const setCurrentTrack = (track: Track) => {
    setCurrentTrackState(track);
    setIsPlaying(true);
  };

  const togglePlay = () => setIsPlaying((prev) => !prev);

  const toggleLike = (trackId: string) => {
    const isAdding = !likedTrackIds.includes(trackId);
    setLikedTrackIds(prev => isAdding ? [...prev, trackId] : prev.filter(id => id !== trackId));
    showToast(isAdding ? "Added to Liked Songs" : "Removed from Liked Songs");
  };

  const createPlaylist = (name: string) => {
    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      name,
      trackIds: []
    };
    setPlaylists(prev => [...prev, newPlaylist]);
    showToast(`Created playlist "${name}"`);
  };

  const addTrackToPlaylist = (playlistId: string, trackId: string) => {
    const playlist = playlists.find(pl => pl.id === playlistId);
    if (playlist && !playlist.trackIds.includes(trackId)) {
      setPlaylists(prev => prev.map(pl => 
        pl.id === playlistId ? { ...pl, trackIds: [...pl.trackIds, trackId] } : pl
      ));
      showToast(`Added to "${playlist.name}"`);
    }
  };

  const updatePlaylistName = (playlistId: string, newName: string) => {
    setPlaylists(prev => prev.map(pl => 
      pl.id === playlistId ? { ...pl, name: newName } : pl
    ));
    showToast("Playlist renamed");
  };

  const deletePlaylist = (playlistId: string) => {
    setPlaylists(prev => prev.filter(pl => pl.id !== playlistId));
    showToast("Playlist deleted");
  };

  return (
    <PlayerContext.Provider value={{ 
      currentTrack, isPlaying, likedTrackIds, playlists, toastMessage,
      setCurrentTrack, togglePlay, toggleLike, createPlaylist, 
      addTrackToPlaylist, updatePlaylistName, deletePlaylist, showToast, hideToast
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
