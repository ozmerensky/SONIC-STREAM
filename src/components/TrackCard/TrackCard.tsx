import React, { useState } from 'react';
import { Track } from '../../types/track';
import { usePlayer } from '../../context/PlayerContext';
import styles from './TrackCard.module.css';

interface TrackCardProps {
  track: Track;
}

export const TrackCard: React.FC<TrackCardProps> = ({ track }) => {
  const { setCurrentTrack, likedTrackIds, toggleLike, playlists, addTrackToPlaylist } = usePlayer();
  const [showMenu, setShowMenu] = useState(false); 
  
  const isLiked = likedTrackIds.includes(track.id);

  return (
    <div className={styles.card} data-testid="track-card">
      <div className={styles.imageWrapper}>
        <img src={track.albumCover} alt={`${track.title} cover`} className={styles.cover} />
        <button 
          className={styles.playButton} 
          onClick={() => setCurrentTrack(track)}
          aria-label={`Play ${track.title}`}
        >
          ▶
        </button>
      </div>
      
      <div className={styles.info}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{track.title}</h3>
          <div className={styles.actions}>
            <button 
              className={`${styles.iconBtn} ${isLiked ? styles.liked : ''}`}
              onClick={() => toggleLike(track.id)}
              aria-label={isLiked ? "Remove from liked" : "Add to liked"}
            >
              {isLiked ? '♥' : '♡'}
            </button>
            
            <div className={styles.menuWrapper}>
              <button 
                className={styles.iconBtn} 
                onClick={() => setShowMenu(!showMenu)}
                aria-label="Add to playlist"
              >
                ＋
              </button>
              
              {showMenu && (
                <div className={styles.dropdown}>
                  <p className={styles.dropdownTitle}>Add to playlist</p>
                  {playlists.map(pl => (
                    <button 
                      key={pl.id} 
                      className={styles.dropdownItem}
                      onClick={() => {
                        addTrackToPlaylist(pl.id, track.id);
                        setShowMenu(false);
                      }}
                      aria-label={`Add to ${pl.name}`}
                    >
                      {pl.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <p className={styles.artist}>{track.artist}</p>
      </div>
    </div>
  );
};