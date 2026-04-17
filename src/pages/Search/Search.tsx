import { useEffect, useState } from 'react';
import { trackService } from '../../services/trackService';
import { Track } from '../../types/track';
import { TrackGrid } from '../../components/TrackGrid/TrackGrid'; // ייבוא חדש
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

      <TrackGrid 
        tracks={filteredTracks} 
        isLoading={isLoading} 
        emptyMessage={`No tracks found for "${searchTerm}"`} 
      />
    </div>
  );
};
