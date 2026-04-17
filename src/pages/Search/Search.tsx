import { useEffect, useState } from 'react';
import { trackService } from '../../services/trackService';
import { Track } from '../../types/track';
import { TrackCard } from '../../components/TrackCard/TrackCard';
import { TrackCardSkeleton } from '../../components/TrackCard/TrackCardSkeleton';
import styles from './Search.module.css';

export const Search = () => {
  const [allTracks, setAllTracks] = useState<Track[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTracks = async () => {
      try {
        const data = await trackService.getTracks();
        setAllTracks(data);
      } finally {
        setIsLoading(false);
      }
    };
    loadTracks();
  }, []);

  const filteredTracks = allTracks.filter(track => 
    track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    track.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.searchContainer} data-testid="main-content">
      <div className={styles.searchHeader}>
        <input 
          type="text" 
          placeholder="What do you want to listen to?" 
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
        />
      </div>

      <div className={styles.trackGrid}>
        {isLoading ? (
          Array.from({ length: 4 }).map((_, n) => <TrackCardSkeleton key={n} />)
        ) : filteredTracks.length > 0 ? (
          filteredTracks.map((track) => <TrackCard key={track.id} track={track} />)
        ) : (
          <p className={styles.noResults}>No tracks found for "{searchTerm}"</p>
        )}
      </div>
    </div>
  );
};
