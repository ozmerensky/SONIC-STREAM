import { useEffect, useState } from 'react';
import { usePlayer } from '../../context/PlayerContext';
import { trackService } from '../../services/trackService';
import { Track } from '../../types/track';
import styles from './Library.module.css';
import { TrackGrid } from '../../components/TrackGrid/TrackGrid';

export const Library = () => {
  const { likedTrackIds } = usePlayer();
  const [likedTracks, setLikedTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadLikedTracks = async () => {
      try {
        const allTracks = await trackService.getTracks();
        const filtered = allTracks.filter(track => likedTrackIds.includes(track.id));
        setLikedTracks(filtered);
      } finally {
        setIsLoading(false);
      }
    };
    loadLikedTracks();
  }, [likedTrackIds]);

  return (
    <div className={styles.libraryContainer} data-testid="main-content">
      <h1 className={styles.mainTitle}>Liked Songs</h1>
      <TrackGrid 
        tracks={likedTracks} 
        isLoading={isLoading} 
        emptyMessage="Songs you like will appear here." 
      />
    </div>
  );
};
