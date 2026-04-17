import { useParams, useNavigate } from 'react-router-dom';
import { usePlayer } from '../../context/PlayerContext';
import { trackService } from '../../services/trackService';
import { Track } from '../../types/track';
import { useEffect, useState } from 'react';
import styles from './PlaylistDetails.module.css';
import { TrackGrid } from '../../components/TrackGrid/TrackGrid';

export const PlaylistDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { playlists, updatePlaylistName, deletePlaylist } = usePlayer();
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

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${playlist?.name}"?`)) {
      deletePlaylist(playlist!.id);
      navigate('/');
    }
  };

  if (!playlist) return <div className="contentArea">Playlist not found</div>;

  return (
    <div className={styles.container} data-testid="main-content">
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
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
          
          <button 
            className={styles.deleteBtn} 
            onClick={handleDelete}
            aria-label="Delete playlist"
            title="Delete Playlist"
          >
            🗑️
          </button>
        </div>
      </div>

      <TrackGrid 
        tracks={playlistTracks} 
        isLoading={false}
        emptyMessage="No tracks in this playlist yet. Go find some music!" 
      />
    </div>
  );
};
