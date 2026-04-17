import { useEffect, useState } from 'react';
import { trackService } from '../../services/trackService';
import { Track } from '../../types/track';
import styles from './Home.module.css';
import { TrackGrid } from '../../components/TrackGrid/TrackGrid';

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
    <div className={styles.homeContainer} data-testid="main-content">
        <h1 className={styles.mainTitle}>Sonic Stream</h1>
        <TrackGrid tracks={tracks} isLoading={isLoading} />
    </div>
  );

};