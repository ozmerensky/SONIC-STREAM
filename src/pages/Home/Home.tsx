import { useEffect, useState } from 'react';
import { trackService } from '../../services/trackService';
import { Track } from '../../types/track';
import { TrackCard } from '../../components/TrackCard/TrackCard';
import { TrackCardSkeleton } from '../../components/TrackCard/TrackCardSkeleton';
import styles from './Home.module.css';

export const Home = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTracks = async () => {
      try {
        const data = await trackService.getTracks();
        setTracks(data);
      } finally {
        setIsLoading(false);
      }
    };
    loadTracks();
  }, []);

  return (
    <div className={styles.homeContent} data-testid="main-content">
      <h1 className={styles.mainTitle}>Sonic Stream</h1>
      <div className={styles.trackGrid}>
        {isLoading 
          ? Array.from({ length: 8 }).map((_, n) => <TrackCardSkeleton key={n} />)
          : tracks.map((track) => <TrackCard key={track.id} track={track} />)
        }
      </div>
    </div>
  );
};