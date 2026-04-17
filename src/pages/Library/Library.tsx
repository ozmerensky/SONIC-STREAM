import { useEffect, useState } from 'react';
import { usePlayer } from '../../context/PlayerContext';
import { trackService } from '../../services/trackService';
import { Track } from '../../types/track';
import { TrackCard } from '../../components/TrackCard/TrackCard';
import { TrackCardSkeleton } from '../../components/TrackCard/TrackCardSkeleton';
import styles from './Library.module.css';

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
      
      <div className={styles.trackGrid}>
        {isLoading ? (
          Array.from({ length: 4 }).map((_, n) => <TrackCardSkeleton key={n} />)
        ) : likedTracks.length > 0 ? (
          likedTracks.map((track) => <TrackCard key={track.id} track={track} />)
        ) : (
          <div className={styles.emptyState}>
            <p>Songs you like will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};
