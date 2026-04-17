import { useParams } from 'react-router-dom';
import { usePlayer } from '../../context/PlayerContext';
import { trackService } from '../../services/trackService';
import { Track } from '../../types/track';
import { TrackCard } from '../../components/TrackCard/TrackCard';
import { useEffect, useState } from 'react';
import styles from './PlaylistDetails.module.css';

export const PlaylistDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { playlists, updatePlaylistName } = usePlayer();
  const [playlistTracks, setPlaylistTracks] = useState<Track[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  const playlist = playlists.find(p => p.id === id);

  useEffect(() => {
    const fetchTracks = async () => {
      if (playlist) {
        const allTracks = await trackService.getTracks();
        const filtered = allTracks.filter(t => playlist.trackIds.includes(t.id));
        setPlaylistTracks(filtered);
      }
    };
    fetchTracks();
  }, [playlist, playlist?.trackIds]);

  if (!playlist) return <div className="contentArea">Playlist not found</div>;

  return (
    <div className={styles.container} data-testid="main-content">
      <div className={styles.header}>
        {isEditing ? (
          <input 
            className={styles.nameInput}
            defaultValue={playlist.name}
            onBlur={(e) => {
                updatePlaylistName(playlist.id, e.target.value);
                setIsEditing(false);
            }}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                updatePlaylistName(playlist.id, e.currentTarget.value);
                setIsEditing(false);
                }
            }}
            autoFocus
            />
        ) : (
          <h1 className={styles.title} onClick={() => setIsEditing(true)}>
            {playlist.name} <span className={styles.editIcon}>✏️</span>
          </h1>
        )}
      </div>

      <div className={styles.trackGrid}>
        {playlistTracks.length > 0 ? (
          playlistTracks.map(track => <TrackCard key={track.id} track={track} />)
        ) : (
          <div className={styles.emptyState}>
            <p>No tracks in this playlist yet. Go find some music!</p>
          </div>
        )}
      </div>
    </div>
  );
};
