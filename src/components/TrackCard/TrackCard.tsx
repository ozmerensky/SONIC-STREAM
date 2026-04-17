import React from 'react';
import { Track } from '../../types/track';
import { usePlayer } from '../../context/PlayerContext';
import styles from './TrackCard.module.css';

interface TrackCardProps {
  track: Track;
}

export const TrackCard: React.FC<TrackCardProps> = ({ track }) => {
  const { setCurrentTrack, likedTrackIds, toggleLike } = usePlayer();
  const isLiked = likedTrackIds.includes(track.id);

  return (
    <div className={styles.card} data-testid="track-card">
      <div className={styles.imageWrapper}>
        <img src={track.albumCover} alt={`${track.title} cover`} className={styles.cover} />
        <button 
          className={styles.playButton} 
          aria-label={`Play ${track.title}`}
          onClick={() => setCurrentTrack(track)}
        >
          ▶
        </button>
      </div>
      <div className={styles.info}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{track.title}</h3>
          <button 
            className={`${styles.likeButton} ${isLiked ? styles.liked : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleLike(track.id);
            }}
            aria-label={isLiked ? "Remove from liked" : "Add to liked"}
          >
            {isLiked ? '♥' : '♡'}
          </button>
        </div>
        <p className={styles.artist}>{track.artist}</p>
      </div>
    </div>
  );
};