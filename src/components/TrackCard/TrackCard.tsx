import React from 'react';
import { Track } from '../../types/track';
import styles from './TrackCard.module.css';

interface TrackCardProps {
  track: Track;
}

export const TrackCard: React.FC<TrackCardProps> = ({ track }) => {
  return (
    <div className={styles.card} data-testid="track-card">
      <div className={styles.imageWrapper}>
        <img src={track.albumCover} alt={`${track.title} cover`} className={styles.cover} />
        <button className={styles.playButton} aria-label={`Play ${track.title}`}>
          ▶
        </button>
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{track.title}</h3>
        <p className={styles.artist}>{track.artist}</p>
      </div>
    </div>
  );
};